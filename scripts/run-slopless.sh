#!/bin/bash

# Target directory defaults to posts/2025
TARGET_DIR="posts/2025"
RUN_ALL=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --all) RUN_ALL=true ;;
    *) TARGET_DIR="$1" ;;
  esac
  shift
done

FINDINGS_DIR=".slopless/findings/$(basename "$TARGET_DIR")"
mkdir -p "$FINDINGS_DIR"

echo "========================================="
echo "Running slopless on: $TARGET_DIR"
if [ "$RUN_ALL" = true ]; then
  echo "Mode:               All files"
else
  echo "Mode:               Modified files only (use --all to check all)"
fi
echo "Output directory:   $FINDINGS_DIR"
echo "========================================="

# Counters
total=0
clean=0
issues=0
errors=0

# Determine file list preserving spaces and stripping git quotes
if [ "$RUN_ALL" = true ]; then
  FILE_LIST=$(find "$TARGET_DIR" -type f -name "*.md" | sort)
else
  FILE_LIST=$(git status --porcelain "$TARGET_DIR" | sed 's/^...//' | sed 's/^"//;s/"$//' | grep '\.md$' | sort)
  if [ -z "$FILE_LIST" ]; then
    echo "No modified markdown files found in $TARGET_DIR."
    exit 0
  fi
fi

# Use process substitution so loop variables persist in shell
while read -r file; do
  [ -f "$file" ] || continue
  
  # Calculate relative path and target output paths
  rel_path="${file#$TARGET_DIR/}"
  rel_dir=$(dirname "$rel_path")
  rel_name=$(basename "$rel_path" .md)
  
  # Ensure the subdirectory exists in findings
  mkdir -p "$FINDINGS_DIR/$rel_dir"
  output_file="$FINDINGS_DIR/$rel_dir/${rel_name}.json"
  
  # Run slopless and redirect output to json file
  slopless "$file" > "$output_file" 2>&1
  status=$?
  
  total=$((total + 1))
  
  if [ $status -eq 0 ]; then
    clean=$((clean + 1))
    echo -e "✅ \033[0;32m$rel_path\033[0m: Clean"
  elif [ $status -eq 1 ]; then
    issues=$((issues + 1))
    # Count findings using jq
    findings_count=$(jq '.[0].messages | length' "$output_file" 2>/dev/null || echo "unknown")
    echo -e "⚠️  \033[0;33m$rel_path\033[0m: $findings_count prose issues"
  else
    errors=$((errors + 1))
    echo -e "❌ \033[0;31m$rel_path\033[0m: Failed to run (Exit code $status)"
  fi
done <<< "$FILE_LIST"

echo "========================================="
echo "Summary:"
echo -e "📂 Total Checked: $total"
echo -e "✅ Clean:         \033[0;32m$clean\033[0m"
echo -e "⚠️  With Issues:   \033[0;33m$issues\033[0m"
if [ $errors -gt 0 ]; then
  echo -e "❌ Failed/Errors: \033[0;31m$errors\033[0m"
fi
echo "========================================="
