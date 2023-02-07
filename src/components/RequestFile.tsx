import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FirebaseService from '../_services/Firebase'

function RequestFile() {

  const [fileId, setFileId] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = await FirebaseService.getSingleFile(fileId);

    if(undefined !== file){
      navigate(`/files/${file.id}`);
      return;
    }

    setFileId('');

    await Swal.fire({
      icon: 'question',
      title: 'Aucun résultats',
      text: "S'il vous plait veillez réessayez avec un autre identifiant"
    })
  }

  return (
    <Card>
      <Card.Header>Rechercher fichier</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control className="mb-3" 
            type="text" 
            placeholder="Exemple: ABCDEFGH"
            minLength={8}
            maxLength={8}
            max="8"
            onChange={(e) => setFileId(e.target.value)}
            required 
          />
          <Button className='w-100' type='submit'>Rechercher</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default RequestFile