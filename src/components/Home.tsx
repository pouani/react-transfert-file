import React, { ChangeEvent, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';

function Home() {
  const MAX_FILE_SIZE_IN_MB = 10;

  const [file, setFile] = useState<File>()

  const handleFileChange = (e: ChangeEvent<HTMLFormElement>) => {
    const files = e.target.files;
    if(null === files || files.length === 0) return;

    const fileSizeInMB = Number((files[0].size / (1048576)).toFixed(2))

    if(fileSizeInMB >= MAX_FILE_SIZE_IN_MB){
      Swal.fire({
        title: 'Erreur',
        text: `Le fichier ne doit pas dépasser ${MAX_FILE_SIZE_IN_MB} Mo`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

    setFile(files[0])
  }
  return (
    <Card>
      <Card.Header>Envoyer un fichier</Card.Header>
      <Card.Body>
        <Form noValidate>
          <Form.Control className="mb-3" type="file" onChange={handleFileChange} required></Form.Control>
          <Button className='w-100' type="submit">Envoyer</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Home