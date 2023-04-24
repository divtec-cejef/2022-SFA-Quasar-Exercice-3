<template>
<q-card
  class="card">

  <q-img
    :src="plat.image ? plat.image : require('../assets/cassoulet.jpg')"
    basic
    contain
  >
    <div class="absolute-bottom text-h6">
      {{ plat.nom }}
    </div>
  </q-img>

  <q-card-section>
    <q-rating
      readonly
      :model-value="plat.note"
      size="2em"
      color="orange"
      class="q-mt-sm"
    />
  </q-card-section>

  <q-card-section class="description">
    <div v-if="plat.description">
      {{ plat.description }}
    </div>
    <div class="text-italic" v-else>
      Aucune description fournie
    </div>
  </q-card-section>

  <q-card-actions
    class="absolute-bottom"
    align="right">
    <q-btn
      @click="afficherFormPlat = true"
      icon="edit"
      color="blue"
      flat>Modifier</q-btn>
    <q-btn
      @click="afficherSupprimerPlat = true"
      icon="delete"
      color="red"
      flat>Supprimer</q-btn>
  </q-card-actions>

  <q-dialog
    v-model="afficherFormPlat">
    <form-plat action="modifier" :platAModifier="plat" />
  </q-dialog>

  <q-dialog
    v-model="afficherSupprimerPlat">
    <q-card>
      <q-card-section class="q-pr-xl">
        <div class="text-h6 heading">Supprimer le plat</div>
        <div>Voulez-vous supprimer ce plat ?</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Annuler"
          color="grey"
          v-close-popup />
        <q-btn
          label="Supprimer"
          color="primary"
          v-close-popup
          @click="supprimerPlat(plat.id)"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['plat'],
  data () {
    return {
      afficherFormPlat: false,
      afficherSupprimerPlat: false
    }
  },
  components: {
    'form-plat': require('components/FormPlat.vue').default
  },
  methods: {
    ...mapActions('plats', ['supprimerPlat'])
  }
}
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd!important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
.card .description {
  padding: 5px 16px;
}
</style>
