import React, { useState } from 'react';
import ClhEdwApi from "../ClhEdwApi";

function PartySearch({ token }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    function handleSearchTermChange(event) {
        setSearchTerm(event.target.value);
    }

    async function handleSearchSubmit(event) {
        event.preventDefault();
        try {
            const response = await ClhEdwApi.post('/v2/EDWData/Parties', { name: searchTerm }, { headers: { Authorization: `Bearer ${token}` } });
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <label htmlFor="search-term">Search for parties:</label>
                <input
                    type="text"
                    id="search-term"
                    name="search-term"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <button type="submit">Search</button>
            </form>
            {searchResults.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Party ID</th>
                            <th>Name</th>
                            <th>Party Number</th>
                            <th>Address</th>
                            <th>Active</th>
                            <th>Policy Numbers</th>
                            <th>DOB</th>
                            <th>NPI</th>
                            <th>Last 4 SSN</th>
                            <th>License Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map(result => (
                            <tr key={result.partyId}>
                                <td>{result.partyId}</td>
                                <td>{result.name}</td>
                                <td>{result.partyNumber}</td>
                                <td>{result.address}</td>
                                <td>{result.active ? 'Yes' : 'No'}</td>
                                <td>{result.policyNumbers.join(', ')}</td>
                                <td>{result.dob}</td>
                                <td>{result.npi}</td>
                                <td>{result.last4SSN}</td>
                                <td>{result.licenseNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
}

export default PartySearch;
