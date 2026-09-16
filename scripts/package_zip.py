import os
import zipfile
import shutil

EXCLUDE_DIRS = {'node_modules', '.next', '.git', '__pycache__'}
EXCLUDE_FILES = {'airbnb-listing-clone.zip'}

def create_zip():
    base_dir = os.path.abspath('.')
    parent_dir = os.path.abspath('..')
    dest_zip_parent = os.path.join(parent_dir, 'airbnb-listing-clone.zip')
    dest_zip_local = os.path.join(base_dir, 'airbnb-listing-clone.zip')
    
    # Remove existing zips if any
    for z in [dest_zip_parent, dest_zip_local]:
        if os.path.exists(z):
            try:
                os.remove(z)
            except Exception:
                pass

    print(f"Packaging project from {base_dir}...")
    
    with zipfile.ZipFile(dest_zip_parent, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(base_dir):
            # Modify dirs in-place to exclude unwanted directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            
            for file in files:
                if file in EXCLUDE_FILES or file.endswith('.zip'):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, base_dir)
                zf.write(full_path, rel_path)
                
    # Copy to project root as well for convenience
    shutil.copyfile(dest_zip_parent, dest_zip_local)
    
    size_mb = os.path.getsize(dest_zip_parent) / (1024 * 1024)
    print(f"Successfully created zip archive: {dest_zip_parent} ({size_mb:.2f} MB)")
    print(f"Copied to local directory: {dest_zip_local}")

if __name__ == '__main__':
    create_zip()
