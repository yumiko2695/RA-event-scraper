import React, {useEffect, useState} from 'react';
import Modal from 'react-modal'
import axios from 'axios'
Modal.setAppElement('#root')

const customStyles = {
  overlay: {
    // backgroundColor: 'rgba(0,0,0,.8)',
    // position: 'fixed',
    // zIndex: '999999',
    // top: '0',
    // left: '0',
    // width: '100vw',
    // height: '100vh',
    // background: 'rgba(0, 0, 0, 0.3)',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '50',
    background: 'rgba(0, 0, 0, 0.6)',
  },
  content : {
    // color: 'white',
    // backgroundColor: 'black',
    // top                   : '50%',
    // left                  : '50%',
    // right                 : 'auto',
    // bottom                : 'auto',
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)',
    display: 'block',
    width: '600px',
    maxWidth: '100%',
    height: '400px',
    maxHeight: '100%',
    position: 'fixed',
    zIndex: '100',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    boxShadow: '0 0 60px 10px rgba(0, 0, 0, 0.9)',
  }
};
const modalGuts = {
  zIndex: '1000',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  padding: '20px 50px 20px 20px'
}

const infoStyles = {
  zIndex: '1000',
  position: 'relative',
  width: '100%',
  display: 'block',
}

const releaseStyles = {
  display: 'flex',
  flexDirection:  'row',
  flexWrap: 'wrap',
  width: 'auto',
}

function Releases(props){
  const {index, releaseTitle, format, label, thumb} = props
  return (
    <div key={index} >
      <h5>{releaseTitle}</h5>
      <h5>{format}</h5>
      <h5>{label}</h5>
        <div className="thumbnail">
          <img src={thumb}/>
        </div>
      </div>
  )
}

function ArtistInfo(props){
  const { el, lastFmInfo, discogsInfo, closeModal} = props

  return(
          <div className='modalGuts'>
            <h2>About {el}</h2>
              {lastFmInfo && lastFmInfo.artist ?
                <div className='infoStyles' >
                  <h3>{lastFmInfo.artist.name}</h3>
                  <h5>{lastFmInfo.artist.url}</h5>
                  <h6>{lastFmInfo.artist.bio.content}</h6>
                  <h6>{lastFmInfo.artist.summary}</h6>
                </div>
              : <div><h4>loading ...</h4></div>}
              {discogsInfo !== [] ?
                          <div>
                            <h4>{el} Releases</h4>
                            <div className="releasesContainer" style={releaseStyles}>
                              {discogsInfo.map((i, index) => {
                                  const {title, format, label, thumb} = i;
                                    return (
                                      <Releases key={index} releaseTitle={title} format={format} label={label} thumb={thumb}/>
                                    )
                              })}
                            </div>
                          </div>
                        : <div><h4>loading releases....</h4></div>
                        }
          <button onClick={closeModal}>Close</button>
            </div>

  )
}

function Artists(props) {
  var subtitle;
  const [eventURL, setEventURL] = useState("")
  const [artistsArr, setArtistsArr] = useState([])
  const [discogsInfo, setDiscogsInfo] = useState([])
  const [lastFmInfo, setLastFmInfo] = useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalNum, setModalNum] = useState(false)
  console.log(discogsInfo)

  const openModal = (event) => {
      setModalNum(event.currentTarget.id)
      setIsOpen(true)
      getInfoLastFm(event.currentTarget.name)
      getInfoDiscogs(event.currentTarget.name)
  }
  // const afterOpenModal = () => {subtitle.style.color = '#f00'}

  const closeModal = () => {
    setIsOpen(false)
    setDiscogsInfo([])
    setLastFmInfo([])
    setModalNum(false)
  }

  // const getInfoDiscogs = async (artist) => {
  //   try {
  //     const resDiscogs = await axios.get(`/api/discogs/${artist}`)
  //     console.log(resDiscogs)
  //     if(resDiscogs.data) {
  //       setDiscogsInfo(resDiscogs.data)
  //     }
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }
  const getInfoDiscogs = async (artist) => {
    try {
      const id = await axios.get(`/api/discogs/idNum/${artist}`)
      console.log(id)
      if(id) {
        const resDiscogs = await axios.get(`/api/discogs/profile/${id.data}`)
        console.log(resDiscogs)
        setDiscogsInfo(resDiscogs.data)
      }
    } catch(e) {
      console.log(e)
    }
  }
  const getInfoLastFm = async (artist) => {
    try {
      const resLastFm = await axios.get(`/api/lastfm/${artist}`)
      console.log(resLastFm.data)
      if(resLastFm) {
        setLastFmInfo(resLastFm.data)
      }
    } catch(e) {
      console.log(e)
    }
  }
  const handleSubmit = async (event) => {
    try {
      event.persist()
      let res = await axios.get('/api/artists/', {params: {
        eventUrl: JSON.stringify(eventURL)
      }})
      setArtistsArr(res.data);
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='artists-container'>
          <label>Enter Event URL Here:
            <input type="text" value={eventURL || ''} onChange={(event) => {setEventURL(event.target.value)}} />
          </label>
          <input type="submit" value="Submit" onClick={handleSubmit}/>
      </div>
        {(artistsArr.length === 0) ? null :
            (<div>
              <h3>Artists:</h3>
                      {artistsArr.map((el, index) => (
                        <div key={index}>
                        <h4>{el}</h4>
                        {modalIsOpen && modalNum && (Number(modalNum) === Number(index)) ?
                          <ArtistInfo key={index} i={index} el={el} modalNum={modalNum} lastFmInfo={lastFmInfo} discogsInfo={discogsInfo} closeModal={closeModal}/> :
                          <button onClick={openModal} name={el} id={index}> More Info</button>}
                        </div>
                      ))}
              </div>)}
              </div>)}
export default Artists;

