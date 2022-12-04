import React, { useState } from "react"
import './Search.scss'
import client from '../client'


export default ({ onCloseModal = () => { } }) => {
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const _onSearch = (e) => {
    const { value } = e.target
    setSearchTerm(value)
  }

  const _onSubmit = async (e) => {
    if (e.which === 13) {
      const results = await client.search(searchTerm)
      setSearchResults(results)
    }
  }

  return (
    <div className="search-modal">
      <div className="search-modal-header">
        <input className="search-modal-header-input" onChange={_onSearch} value={searchTerm} onKeyUp={_onSubmit}>
        </input>

        <button onClick={onCloseModal}>
          <p>x</p>
        </button>
      </div>
      <div className="search-modal-list">
        <div className="search-modal-list-header">
          <div className="search-modal-list-header-item">Campaign Name</div>
          <div className="search-modal-list-header-item search-modal-list-header-item-border">Note Title</div>
          <div className="search-modal-list-header-item">Note Category</div>
          <div className="search-modal-list-header-item search-modal-list-header-item-border">Marker Name</div>
          <div className="search-modal-list-header-item">Marker Category</div>
        </div>
        {searchResults.map((searchResult) => (
          <div
            key={searchResult.note_id}
            className="search-modal-list-item"
            onClick={() => window.location.href = `/campaign/${searchResult.campaign_id}?markerId=${searchResult.marker_id}&noteId=${searchResult.note_id}`}
          >
            <div className="search-modal-list-item-campaign_name search-modal-list-item-column">
              {searchResult.campaign_name}
            </div>
            <div className="search-modal-list-item-note_title search-modal-list-item-column">
              {searchResult.note_title}
            </div>
            <div className="search-modal-list-item-note_category search-modal-list-item-column">
              {searchResult.note_category}
            </div>
            <div className="search-modal-list-item-marker_name search-modal-list-item-column">
              {searchResult.marker_name}
            </div>
            <div className="search-modal-list-item-marker_category search-modal-list-item-column">
              {searchResult.marker_category}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

