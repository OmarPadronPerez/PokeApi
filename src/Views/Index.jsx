import { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap";
import axios from 'axios';
import PokeTarjeta from '../Components/PokeTarjeta';


const Index = () => {
  const [pokemones, setPokemones] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [allPokemones, setAllPokemones] = useState([]);
  const [listado, setListado] = useState([]);
  const [filtro, setFiltro] = useState([]);

  useEffect(() => {
    getPokemones(offset);
    getAllPokemones();
  }, [])

  const getPokemones = async (o) => {
    const liga = 'https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + o;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemones(respuesta.results);
      setListado(respuesta.results);
    })
  }
  const getAllPokemones = async (o) => {
    const liga = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setAllPokemones(respuesta.results);
    })
  }

  const buscar = async (e) => {
    
      if (filtro.trim() != '') {
        setListado([]);
        setTimeout(() => {
          setListado(allPokemones.filter(p => p.name.includes(filtro)))
        }, 100)
    }
    else{
      setListado([]);
        setTimeout(() => {
          setListado(pokemones);
        }, 100)
    }
  }

  return (
    <Container className="shadow bg-danger mt-3">
      <Row>
        <Col>
          <InputGroup className="mt-3 mb-3 shadow">
            <InputGroupText> <i className="fa-solid fa-search" ></i> </InputGroupText>
            <Input
              value={filtro}
              onChange={(e) => { setFiltro(e.target.value) }}
              onKeyUpCapture={buscar}
              placeholder="Buscar"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {listado.map((pok, i) => (
          <PokeTarjeta poke={pok} key={i}></PokeTarjeta>
        ))}
      </Row>
    </Container>
  )
}

export default Index