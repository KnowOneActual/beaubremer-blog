#!/usr/bin/env python3
import os
import re
import sys

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Fix smart quotes
    # Double curly quotes
    content = content.replace('“', '"').replace('”', '"')
    # Single curly quotes / apostrophes
    content = content.replace('‘', "'").replace('’', "'")
    
    # 2. Fix closed em-dashes
    # We want to replace U+2014 (—) that does not have spaces around it.
    # We can use regex to match non-whitespace character + U+2014 + non-whitespace character
    # and insert spaces, or just replace all U+2014 with " — " if it doesn't already have spaces.
    # Let's do a safe regex substitution.
    # If it is preceded by a word character/punctuation and followed by word character/punctuation,
    # or just make sure there are spaces around it.
    # Let's replace any '—' that doesn't have spaces around it with ' — '.
    # Safe regex: replace any sequence of optional space + '—' + optional space with ' — '.
    content = re.sub(r'\s*—\s*', ' — ', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    target_dir = sys.argv[1] if len(sys.argv) > 1 else 'posts/2025'
    if not os.path.isdir(target_dir):
        print(f"Error: {target_dir} is not a directory.")
        sys.exit(1)
        
    print(f"Fixing deterministic prose issues in {target_dir}...")
    fixed_count = 0
    total_count = 0
    
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.md'):
                total_count += 1
                filepath = os.path.join(root, file)
                if fix_file(filepath):
                    fixed_count += 1
                    print(f"  Fixed: {os.path.relpath(filepath, target_dir)}")
                    
    print(f"Done! Modified {fixed_count} out of {total_count} files.")

if __name__ == '__main__':
    main()
