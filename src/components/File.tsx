import { getBlob, getStorage, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { useFile } from '../hooks/useFile';

function File() {

  const params = useParams();

  const [downloading, setDownloading] = useState<boolean>(false); // [false, true

  const { error, file, loading, metadata, owner } = useFile(params.id);

  const handleDownload = async () => {
    setDownloading(true);

    const blob = await getBlob(ref(getStorage(), file.uniqueFilename));
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = file.originalFilename;
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    setDownloading(false);
  }

  return (
    <div>
      {
        error ? (
          <Alert variant='danger'>Une erreur est survenue!</Alert>
        ) : loading ? (
          <Card>
            <Card.Body className='d-flex justify-content-center'>
              <Spinner animation="border" role="status" hidden={!loading}></Spinner>
            </Card.Body>
          </Card>
        ) : 
        <Card>
          <Card.Body className='text-center'>
            <Card.Title>{file?.originalFilename}</Card.Title>
            <Button className={downloading ? 'disabled mb-3' : 'mb-3'} 
            variant='success' onClick={handleDownload}>{downloading ? 'Téléchargement en cours...' : 'Télécharger'}</Button>
          </Card.Body>
          <Card.Footer className='text-muted'>
            Partagé par {owner ? owner.displayName : 'un utilisateur anonyme'}
          </Card.Footer>
        </Card>
      }
    </div>
  )
}

export default File