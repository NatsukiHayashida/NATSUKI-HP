# Darwin/macOS System Utilities

## System Information
- Platform: Darwin (macOS)
- OS Version: Darwin 24.6.0
- Shell: Typically zsh (default on modern macOS)

## Essential Darwin/macOS Commands

### File Operations
```bash
# List files (with hidden files)
ls -la

# Find files
find . -name "*.tsx" -type f
find . -type f -name "package.json"

# File content (prefer Read tool)
cat filename
less filename  # Paginated view
head -n 20 filename  # First 20 lines
tail -n 20 filename  # Last 20 lines

# File permissions
chmod +x script.sh  # Make executable
chmod 644 file.txt  # Read/write for owner, read for others

# Copy/Move/Delete
cp source dest
mv source dest
rm filename
rm -rf directory  # Recursive delete (careful!)
```

### Directory Operations
```bash
# Current directory
pwd

# Change directory
cd /path/to/directory
cd ~  # Home directory
cd -  # Previous directory

# Create directory
mkdir dirname
mkdir -p path/to/nested/dir  # Create parents if needed

# Remove directory
rmdir dirname  # Only if empty
rm -rf dirname  # Remove with contents
```

### Process Management
```bash
# List processes
ps aux | grep node

# Find process by port (useful for dev server)
lsof -i :3000
lsof -ti :3000  # Just PID

# Kill process
kill <PID>
kill -9 <PID>  # Force kill

# Kill by port
lsof -ti :3000 | xargs kill
```

### Network/Port Operations
```bash
# Check what's using a port
lsof -i :3000
netstat -an | grep 3000

# Test network connectivity
curl https://example.com
ping example.com

# Download file
curl -O https://example.com/file.zip
wget https://example.com/file.zip  # If installed
```

### Search Operations

**Prefer Grep tool over command line grep**

```bash
# Search in files (use Grep tool instead when possible)
grep -r "search term" ./
grep -r "import.*React" --include="*.tsx" ./

# Find and grep combined
find . -name "*.tsx" -exec grep -l "useState" {} \;

# Case-insensitive search
grep -ri "pattern" ./
```

### Text Processing
```bash
# sed (stream editor)
sed 's/old/new/g' file.txt  # Replace text
sed -i '' 's/old/new/g' file.txt  # In-place (macOS syntax)

# Note: macOS sed requires '' after -i flag
# Linux sed: sed -i 's/old/new/g' file.txt
# macOS sed: sed -i '' 's/old/new/g' file.txt

# awk (text processing)
awk '{print $1}' file.txt  # Print first column
```

### System Information
```bash
# Disk usage
df -h  # Overall disk space
du -sh *  # Size of each item in directory
du -sh directory  # Size of specific directory

# Memory usage
top  # Interactive process viewer
htop  # Better alternative (if installed)

# System info
uname -a  # System information
sw_vers  # macOS version
```

### macOS-Specific Commands
```bash
# Open file/directory in Finder
open .
open filename.txt

# Open with specific app
open -a "Visual Studio Code" .

# Clipboard operations
pbcopy < file.txt  # Copy file to clipboard
pbpaste > file.txt  # Paste clipboard to file
echo "text" | pbcopy  # Copy text to clipboard

# Spotlight search
mdfind "search term"
mdfind -name "filename"
```

### Git Operations (Darwin/macOS)
```bash
# Status and branch
git status
git branch
git log --oneline -10

# Create and switch branch
git checkout -b feature/new-feature
git switch -c feature/new-feature  # Newer syntax

# Stage and commit
git add .
git add -A  # All changes
git add -p  # Interactive staging

git commit -m "message"
git commit --amend  # Amend last commit

# Push/Pull
git push origin branch-name
git pull origin main

# Diff
git diff
git diff --staged
git diff HEAD~1  # Compare with previous commit

# Reset/Revert
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit and changes (careful!)
git revert <commit-hash>  # Create new commit that undoes changes

# Stash
git stash  # Save changes temporarily
git stash pop  # Restore stashed changes
git stash list  # List stashes
```

### Environment Variables (macOS)
```bash
# View environment variables
printenv
echo $PATH
echo $HOME

# Set temporary (current session)
export VAR_NAME="value"

# Set permanent
# Add to ~/.zshrc (zsh) or ~/.bash_profile (bash)
echo 'export VAR_NAME="value"' >> ~/.zshrc
source ~/.zshrc  # Reload
```

### Package Management (macOS)
```bash
# Homebrew (if installed)
brew install package-name
brew update
brew upgrade
brew list

# npm (Node.js)
npm install
npm install -g package-name
npm update
npm list -g --depth=0
```

### Compression/Archive
```bash
# Create archive
tar -czf archive.tar.gz directory/
zip -r archive.zip directory/

# Extract archive
tar -xzf archive.tar.gz
unzip archive.zip
```

### File Permissions and Ownership
```bash
# View permissions
ls -l filename

# Change permissions
chmod 755 script.sh  # rwxr-xr-x
chmod u+x script.sh  # Add execute for user

# Change owner (may need sudo)
chown user:group filename
sudo chown -R user:group directory/
```

## Key Differences from Linux

### sed (Stream Editor)
```bash
# Linux: sed -i 's/old/new/g' file.txt
# macOS: sed -i '' 's/old/new/g' file.txt
# Note the required '' after -i flag on macOS
```

### readlink (Read Symbolic Link)
```bash
# Linux: readlink -f symlink
# macOS: readlink symlink  # No -f flag
# Alternative: greadlink -f (install via: brew install coreutils)
```

### stat (File Statistics)
```bash
# Linux: stat -c %Y filename
# macOS: stat -f %m filename
# Different format specifiers
```

### date (Date Command)
```bash
# Linux: date -d "2 days ago"
# macOS: date -v-2d
# Different syntax for date arithmetic
```

## Troubleshooting Common Issues

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti :3000 | xargs kill -9
```

### Permission Denied
```bash
# Check permissions
ls -la filename

# Fix script permissions
chmod +x script.sh

# Use sudo for system operations (careful!)
sudo command
```

### Command Not Found
```bash
# Check if command exists
which command-name
command -v command-name

# Install via Homebrew
brew install command-name

# Check PATH
echo $PATH
```

### Disk Space Issues
```bash
# Find large directories
du -sh * | sort -h
du -sh ~/Library  # Often large on macOS

# Clean npm cache
npm cache clean --force

# Clean Homebrew
brew cleanup
```

## Best Practices for Darwin/macOS

1. **Use Grep tool over grep command** - Better integration and output
2. **Use Read tool over cat/head/tail** - Proper file handling
3. **Backup before destructive operations** - Always test with `-n` flag first
4. **Verify sed syntax** - Remember the '' after -i on macOS
5. **Check process before killing** - Use `ps aux | grep` to verify
6. **Use absolute paths** - Especially in scripts and automation
7. **Test in development first** - Never run untested commands in production

## Quick Reference: File Search Priority

1. **Known exact file**: Use Read tool with full path
2. **Pattern matching**: Use Glob tool (faster than find)
3. **Content search**: Use Grep tool (better than grep command)
4. **Complex operations**: Use find command with caution
