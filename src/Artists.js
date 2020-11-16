import React, {useEffect, useState} from 'react';
import Modal from 'react-modal'
import axios from 'axios'
import cheerio from 'cheerio'
Modal.setAppElement('#root')


const releaseStyles = {
  display: 'flex',
  flexDirection:  'row',
  flexWrap: 'wrap',
  width: 'auto',
  justifyContent: 'space-around'
}

const linkStyle = {
  color: 'blue'
}

function Releases(props){
  const {index, releaseTitle, format, label, thumb} = props
  return (
    <div key={index} >
      <h5>Release: {releaseTitle}</h5>
      {label ?
      <h5>Label: {label}</h5>
      :<h5>No Label</h5>}
        <div className="thumbnail">
          <img src={thumb}/>
        </div>
        <h5>Format: {format}</h5>
      </div>
  )
}

function ArtistInfo(props){
  const { el, lastFmInfo, discogsInfo, discogsUrl, closeModal} = props
  return(
          <div className='modalGuts'>
            <h2>About {el}</h2>
              {lastFmInfo && lastFmInfo.artist ?
                <div className='infoStyles' >
                  <h6>{lastFmInfo.artist.bio.content}</h6>
                  <h6>{lastFmInfo.artist.summary}</h6>
                  <h6 style={linkStyle} onClick={()=> window.open(lastFmInfo.artist.url, "_blank")}>Learn more on Last.FM</h6>
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
                            <h6 style={linkStyle} onClick={()=> window.open(discogsUrl, "_blank")}>{el} Discogs Page</h6>
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
  const [discogsUrl, setDiscogsUrl] = useState(false)
  console.log(discogsInfo)

  const openModal = (event) => {
      setModalNum(event.currentTarget.id)
      setIsOpen(true)
      getInfoLastFm(event.currentTarget.name)
      getInfoDiscogs(event.currentTarget.name)
  }
  const closeModal = () => {
    setIsOpen(false)
    setDiscogsInfo([])
    setLastFmInfo([])
    setModalNum(false)
    setDiscogsUrl(false)
  }

  const getInfoDiscogs = async (artist) => {
    try {
      const id = await axios.get(`/api/discogs/idNum/${artist}`)
      console.log(id)
      if(id) {
        const resDiscogs = await axios.get(`/api/discogs/profile/${id.data.id}`)
        console.log(resDiscogs)
        setDiscogsUrl(id.data.url)
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
  // const handleSubmit = async (event) => {
  //   try {
  //     event.persist()
  //     let res = await getArtists(eventURL.toString())
  //     console.log(res)
  //     setArtistsArr(res);
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }
  const handleSubmit = async (event) => {
    try {
      event.persist()
       let res = await axios.get('/api/artists/', {params: {
         eventUrl: JSON.stringify(eventURL)
       }})
       console.log(res)
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
                      {artistsArr && artistsArr.map((el, index) => (
                        <div key={index}>
                        <h4>{el}</h4>
                        {modalIsOpen && modalNum && (Number(modalNum) === Number(index)) ?
                          <ArtistInfo key={index} i={index} el={el} modalNum={modalNum} lastFmInfo={lastFmInfo} discogsInfo={discogsInfo} discogsUrl={discogsUrl} closeModal={closeModal}/> :
                          <button onClick={openModal} name={el} id={index}> More Info</button>}
                        </div>
                      ))}
              </div>)}
              </div>)}
export default Artists;

