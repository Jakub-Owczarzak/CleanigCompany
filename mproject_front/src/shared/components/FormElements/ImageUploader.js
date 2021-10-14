import React, { useRef, useState, useEffect } from 'react';
import CustomButton from './CustomButton';
import styled from 'styled-components';

const StyledPreviewContainer = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid black;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 100%;
    height: 100%;
  }
`;
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImageUploader = (props) => {
  // const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  // za pomocą use ref na clic wywołujemy okno do wyboru zdjęć bez potrzeby wyświetlania
  // inputu na froncie
  const pickImageHandler = (e) => {
    filePickerRef.current.click();
    console.log('DUPA');
  };
  // metoda wywoływana na onChange gdy wybierzemy zdjęcie
  const pickedHandler = (e) => {
    console.log(props.fileState);
    let pickedFile;
    let fileIsValid = isValid;
    console.log(e.target.files); // dostajemy się paramtrów wybranego pliku
    if (e.target.files && e.target.files.length === 1) {
      console.log('jestem w ifce');
      pickedFile = e.target.files[0];
      props.fileStateHandler(pickedFile);
      // setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  useEffect(() => {
    if (!props.fileState) {
      return;
    }
    const fileReader = new FileReader(); // tworzymy nowy obiekt bilioteki fileReader
    // event gdy który wychwyci załadowanie pliku zdjęcia wywoła funkcję która do stanu przekaże resultat wybranego zdjęcia
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(props.fileState); // ta funkcja wywoła się dopiero po zarejestrowaniu eventu on load i sparsuje plik na kod binarny
  }, [props.fileState]);

  return (
    <div>
      <input
        id={props.id}
        name={props.name}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <StyledContainer>
        <StyledPreviewContainer>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick the image</p>}
        </StyledPreviewContainer>
        <CustomButton type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </CustomButton>
      </StyledContainer>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUploader;
