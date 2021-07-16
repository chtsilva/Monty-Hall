import React from 'react'
import Porta from "../../../components/Porta";
import { atualizarPortas, criarPortas } from '../../../functions/portas';
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../../../styles/Jogo.module.css'

export default function Jogo() {
  const router = useRouter()
  
  const [valido, setValido] = React.useState(false)
  const [portas, setPortas] = React.useState([])

  React.useEffect(() =>{
    const portas = +router.query.portas
    const temPresente = +router.query.temPresente

    const qtdePortasValidas = portas >= 3 && portas <= 100 
    const temPresenteValido = temPresente >= 1 &&  temPresente <= portas 

    setValido(qtdePortasValidas && temPresenteValido)
  }, [portas, router.query.portas,router.query.temPresente] )
  
  React.useEffect(() =>{
    const portas = +router.query.portas
    const temPresente = +router.query.temPresente
      setPortas(criarPortas(portas, temPresente))
  }, [router?.query] )

  function renderizarPortas() {
    return portas.map(porta => {
      return <Porta key={porta.numero} value={porta}
        onChange={novaPorta => {
          console.log(novaPorta)
          setPortas(atualizarPortas(portas, novaPorta))
        }} />
    })
  }
  return (
    <div id={styles.jogo}>
      <div className={styles.portas}>
        { valido ? 
        renderizarPortas() :
          <h1>Valores inválidos</h1>
      }
      </div>
      <div className={styles.botoes}>
        <Link href="/" passHref>
          <button>Reiniciar</button>
        </Link>
      </div>

    </div>
  )
}