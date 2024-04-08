

import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { createPet, deletePet } from './graphql/mutations'
import { listPets } from './graphql/queries'
import { generateClient } from 'aws-amplify/api';
import { useEffect, useState } from 'react';

function App() {

  const client = generateClient();

  const [pets, setPets] = useState([]);


  const fetchPets = async () => {
    const res = await client.graphql({
      query: listPets
    });
    const petList = res?.data?.listPets?.items;
    setPets(petList);
  };


  useEffect(() => {
    fetchPets();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { target } = e;

    try {
      await client.graphql({
        query: createPet,
        variables: {
          input: {
            name: target.petName?.value,
            description: target?.petDescription?.value,
            petType: target?.petType?.value
          }
        }
      });

      await fetchPets();

    } catch (error) {
      console.log(error);
    }
  };

  const handlePetDelete = async (petId) => {

    try {
      await client.graphql({
        query: deletePet,
        variables: {
          input: {
            id: petId
          }
        }
      });
      fetchPets();

    } catch (error) {
      console.log(error);
    }

  };


  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input placeholder='enter a name' name='petName' />
          <input placeholder='enter a description' name='petDescription' />
          <select name='petType'>
            <option value="none" disabled>
              Please Select a pet
            </option>
            <option value="dog">
              dog
            </option>
            <option value="cat">
              cat
            </option>
            <option value="rabbit">
              rabbit
            </option>
            <option value="turtle">
              turtle
            </option>
          </select>
          <button>create pet</button>
        </form>
        <main>
          <ul>
            {pets.map((pet) => (
              <li onClick={(e) => handlePetDelete(pet.id)} key={pet.id} style={{
                listStyle: 'none',
                border: '1px solid black',
                margin: '10px',
                width: '200px',
                color: 'white'
              }}>
                <article>
                  <h3>{pet.name}</h3>
                  <h5>{pet.petType}</h5>
                  <p>{pet.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </main>

      </div>
    </>
  )
}

export default withAuthenticator(App)
