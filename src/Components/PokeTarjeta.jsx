import { useState, useEffect } from "react"
import axios from "axios"
import { Col, CardFooter, Card, CardImg, CardBody, Badge } from "reactstrap";
import { Link } from "react-router-dom";


const PokeTarjeta = (params) => {
  const [pokemon, setPokemon] = useState([]);
  
  const [imagen, setImagen] = useState('');
  const [cardClass, setCardClass] = useState('d-none');
  const [loadClass, setLoadClass] = useState('');

  useEffect(() => {
    getPokemon()
  }, [])
  const getPokemon = async () => {
    const liga = params.poke.url;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      if(respuesta.sprites.front_default !=null){
        setImagen(respuesta.sprites.front_default);
      }else{
        setImagen(respuesta.sprites.other.dream_world.front_default);
      }
      setCardClass('');
      setLoadClass('d-none');

    })
  }


  return (
    <Col sm='4' lg='3' className="md-3">
      <Card className={'shadow border-4 border-warning m-2 '+loadClass}>
        <CardImg src="/img/carga.gif" height={300} className="p-3"></CardImg>
      </Card>
    
      <Card className={"shadow border-4 border-warning m-2 "+cardClass}>
        <CardImg src={imagen} height='200' className="p-2" />
        <CardBody className="text-center">
          <Badge pill color="danger m-1"># {pokemon.id}</Badge>
          <label className="fs-4 text-capitalize">{pokemon.name}</label>
        </CardBody>
        <CardFooter className='bg-warning text-center'>
          <Link className="btn btn-dark">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            &nbsp; Detalles
          </Link>

        </CardFooter>
      </Card>
    </Col>
  )
}

export default PokeTarjeta