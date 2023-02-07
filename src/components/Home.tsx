import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Card, Form, ProgressBar } from 'react-bootstrap'
import Swal from 'sweetalert2';
import FirebaseService from '../_services/Firebase'

function Home() {
  const MAX_FILE_SIZE_IN_MB = 10;

  const [file, setFile] = useState<File>()
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement>(null) // [null, HTMLInputElement

  const [uploadProgress, setUploadProgress] = useState<number>(0) // [0, 100]

  const [validated, setValidated] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(null === files || files.length === 0) return;

    const fileSizeInMB = Number((files[0].size / (1048576)).toFixed(2))

    if(fileSizeInMB >= MAX_FILE_SIZE_IN_MB){
      Swal.fire({
        title: 'Erreur',
        html: `La taille de votre fichier est (${fileSizeInMB}MB), <br/> Le fichier ne doit pas dépasser ${MAX_FILE_SIZE_IN_MB} Mo`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

    setFile(files[0])
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!e.currentTarget.checkValidity()){
      setValidated(true);
      return;
    }

    const uniqueFilename = FirebaseService.getUniqueFilename(file);
    const uploadTask = FirebaseService.uploadFile(file, uniqueFilename);

    uploadTask.on('state_changed', (snapshot) => {
      setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
    })

    const id = await FirebaseService.addFile(file.name, uniqueFilename)

    setFile(null);

    fileInputRef.value = null;

    Swal.fire({
      footer: `<a href="/files/${id}">${id}</a>`,
      icon: 'success',
      text: 'Le fichier a été envoyé avec succès',
      title: 'Succès',
    });
  }

  return (
    <Card>
      <Card.Header>Envoyer un fichier</Card.Header>
      <Card.Body>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Control className="mb-3" type="file" ref={setFileInputRef} onChange={handleFileChange} required></Form.Control>
          <ProgressBar animated className='mb-3' now={uploadProgress} label={`${uploadProgress}%`} />
          <Button className='w-100' type="submit">Envoyer</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Home