# Deployment Guide

## GitHub Pages Deployment

### Prerequisites
- GitHub account
- Git installed on your computer

### Steps

1. **Create GitHub Repository**
   ```bash
   # Navigate to project directory
   cd AndroidAppForParents-UI-Prototype
   
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: Parental Control UI Prototype"
   ```

2. **Push to GitHub**
   ```bash
   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/AndroidAppForParents-UI-Prototype.git
   
   # Push to main branch
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll to **Pages** section (left sidebar)
   - Under **Source**, select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

4. **Access Your Site**
   - Your site will be available at:
     ```
     https://YOUR_USERNAME.github.io/AndroidAppForParents-UI-Prototype/
     ```
   - It may take 1-2 minutes to deploy

### Custom Domain (Optional)

1. Add a `CNAME` file to the root:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. Configure DNS:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`

## Local Testing

Before deploying, test locally:

### Using Python
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Using Node.js
```bash
npx http-server
# Visit http://localhost:8080
```

### Using PHP
```bash
php -S localhost:8000
# Visit http://localhost:8000
```

## Updating the Site

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically rebuild and deploy (takes 1-2 minutes).

## Troubleshooting

### Site not loading
- Check GitHub Pages is enabled in Settings
- Verify branch is set to `main` and folder to `/`
- Wait a few minutes for deployment

### Images not showing
- Check all image paths are relative (not absolute)
- Verify images are in the repository
- Check file names match exactly (case-sensitive)

### 404 errors
- Ensure `index.html` exists in root
- Check all internal links are relative
- Verify file names match links exactly

## Best Practices

1. **Always test locally first**
2. **Use relative paths** for all resources
3. **Optimize images** before committing
4. **Keep commits organized** with clear messages
5. **Don't commit** sensitive data or large files

## Performance Optimization

Before deploying:

1. **Minify CSS/JS** (optional)
2. **Compress images** 
3. **Enable caching** with appropriate headers
4. **Test on different devices**

---

For more help, see [GitHub Pages Documentation](https://docs.github.com/en/pages)
