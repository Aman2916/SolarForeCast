import gdown

# URL of the file from Google Drive
url = 'https://drive.google.com/file/d/1ZaNAFusRhgh9tBEwhddTW2IckEXw6y31/view?usp=drive_link'
output = 'server/model/solar_model.pkl'
gdown.download(url, output, quiet=False)
