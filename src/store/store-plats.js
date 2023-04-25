// State : données du magasin

const state = {
  plats: [
    {
      id: 1,
      image: 'https://i.imgur.com/0umadnY.jpg',
      nom: 'Burger',
      description: "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      note: 4
    },
    {
      id: 2,
      image: 'https://i.imgur.com/b9zDbyb.jpg',
      nom: 'Pizza',
      description: "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      note: 5
    },
    {
      id: 3,
      image: 'https://i.imgur.com/RbKjUjB.jpg',
      nom: 'Petits choux',
      description:
        'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...',
      note: 1
    },
    {
      id: 4,
      image: 'https://i.imgur.com/xAuhNVg.jpg',
      nom: 'BBQ Ribs',
      description: 'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
      note: 5
    }
  ]
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  /*
  TODO Renommer les mutations en majuscule afin de ne pas les confondre avec les
   actions
  ajouterPlat (state, plat) ⇒ AJOUTER_PLAT (state, plat)
   */
  supprimerPlat (state, id) {
    state.plats = state.plats.filter(plat => (plat.id !== id))
    console.log('Plat supprimé avec succès')
  },
  ajouterPlat (state, plat) {
    // TODO : générer un id unique avec
    // https://quasar.dev/quasar-utils/other-utils#uid-generate-uid
    plat.id = state.plats[state.plats.length - 1].id + 1
    state.plats.push(plat)
    console.log('Plat ajouté avec succès')
  },
  modifierPlat (state, plat) {
    const index = state.plats.findIndex(el => el.id === plat.id)
    if (index !== -1) {
      Object.assign(state.plats[index], plat)
    }
    console.log('Plat modifié avec succès')
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  supprimerPlat ({ commit }, payload) {
    // Valide la mutation et y passe les données
    commit('supprimerPlat', payload)
  },
  ajouterPlat ({ commit }, payload) {
    // Valide la mutation et y passe les données
    commit('ajouterPlat', payload)
  },
  modifierPlat ({ commit }, payload) {
    // Valide la mutation et y passe les données
    commit('modifierPlat', payload)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  /* TODO : trier les plats par nom
  * Penser à toujours trier votre retour
  * Retourner une copie et par une référence

  ``` javascript
  return [...state.plats].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  ```

  * Sources
    * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    * https://usefulangle.com/post/227/javascript-sort-array-of-objects
    * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
     */
  plats (state) {
    return structuredClone(state.plats).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
