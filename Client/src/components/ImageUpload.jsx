import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Constants from '../common/Constants';

function ImageUpload(props) {
  const { image_url, setProfileData, saveImage } = props;
  const onDrop = async (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    //save the Image we chose inside the Node Server

    try {
      const response = await axios.post(
        `${Constants.server_url}/api/uploadImage`,
        formData,
        config
      );

      if (response.data.success) {
        const imagePath = response.data.image.replaceAll('\\', '/');
        setProfileData((prev) => {
          return { ...prev, image_url: imagePath };
        });
        await saveImage({ image_url: imagePath });
      }
    } catch (error) {
      alert('Failed to save the Image in Server');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            {image_url ? (
              <img
                src={`${Constants.server_url}/${image_url}`}
                height='120px'
                width='120px'
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <Avatar
                src='/broken-image.jpg'
                sx={{ width: 120, height: 120 }}
              />
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default ImageUpload;
