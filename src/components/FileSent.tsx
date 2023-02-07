import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import {useFilesSendByCurrentUser} from '../hooks/useFilesSendByCurrentUser'

function FileSent() {
  const { files } = useFilesSendByCurrentUser();
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Header>Fichiers envoyés</Card.Header>
      <ListGroup className='list-group-flush'>
        {0 === files.length ? 
        <ListGroup.Item>Aucun fichier envoyé</ListGroup.Item> 
        : files.map((doc, key) => {
          return <ListGroupItem action key={key} onClick={() => navigate(`/files/${doc.id}`)}>{doc.originalFilename}</ListGroupItem>
        })
        }
      </ListGroup>
    </Card>
  )
}

export default FileSent