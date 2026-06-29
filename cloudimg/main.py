# main.py
# cloudimg - Ubuntu Cloud Image Manager 
# Phase 1: Add and list images

# This is our "database" for now - list of dictionaries 

import requests
images = []

def add_image(name, cloud, arch, version):
    """Add a new Ubuntu cloud image to the list."""
    image = {
        "name": name,
        "cloud": cloud,
        "arch": arch,
        "version": version,
        "status": "available"
    }
    images.append(image)
    print(f"✓ Image '{name}' added to {cloud}.")

def list_images():
    """Print all stored images."""
    if len(images) == 0:
        print("No image found")
        return

    print("\n--- Cloud Images ---")
    for i, img in enumerate(images):
        print(f"[{i}] {img['name']} | {img['cloud']} | {img['arch']} | v{img['version']} | {img['status']}")
    print("--------------\n")

def remove_imgage(index):
    """Remove an image by its list index."""
    if index < 0 or index >= len(images):
        print("Error: Invalid index.")
        return
    removed = images.pop(index)
    print(f"✓ Image '{removed['name']} removed")

def search_images(cloud):
    """Search images in the cloud"""
    found = 0 # counter = track how many matches.

    for i, img in enumerate(images):
        if img["cloud"] == cloud:
            print(f"[{i}] {img['name']} | {img['cloud']} | v{img['version']} | {img['status']}")
            found += 1 # increment conter each match
    
    print("-------\n")
    if found == 0:
        print(f"No images found for {cloud}.")
    
def update_status(index, new_status):
       """Update the status"""
       if index < 0 or index >= len(images):
            print("Error: Invalid index.")
            return

def get_user(user_id):
    response = requests.get(f"https://api.myapp.com/users/{user_id}")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error with status code: {response.status_code}")
        return None


       

    

# Run some actions to test it

add_image("ubuntu-22.04", "AWS", "amd64", "22.04")
add_image("ubuntu-20.04", "GCP", "amd64", "20.04")
add_image("ubuntu-22.04", "Azure", "arm64", "22.04")

list_images()

remove_imgage(1)

list_images()

search_images("AWS")
search_images("Azure")
search_images("Oracle")

