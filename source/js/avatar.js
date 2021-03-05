const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMAGE_DIMENTION = {
  width: '40',
  height: '44',
}

const avatarUploadButton = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview img');
const listingPhotoUploadButton = document.querySelector('.ad-form__upload input[type=file]');
const listingPhotoPreviewContainer = document.querySelector('.ad-form__photo');

const uploadImage = (uploadEntry, previewContainer) => {
  const file = uploadEntry.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (previewContainer.tagName === 'IMG') {
        previewContainer.src = reader.result;
      } else {
        const image = document.createElement('IMG');
        image.src = reader.result;
        image.width = IMAGE_DIMENTION.width;
        image.height = IMAGE_DIMENTION.height;
        previewContainer.append(image);
      }
    });

    reader.readAsDataURL(file);
  }
}

avatarUploadButton.addEventListener('change', () => uploadImage(avatarUploadButton, avatarPreviewContainer));

listingPhotoUploadButton.addEventListener('change', () => uploadImage(listingPhotoUploadButton, listingPhotoPreviewContainer));
