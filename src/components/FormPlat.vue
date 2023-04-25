<template>
<q-card class="form-card">
  <q-card-section>
    <div class="text-h6 heading">{{ action }} Plat</div>
  </q-card-section>

  <q-card-section>
    <div class="row q-mb-md">
      <q-input
        ref="nom"
        filled
        v-model="plat.nom"
        label="Nom (Burger)"
        class="col"
        :rules="[val => !!val || 'Le nom est obligatoire', val => val.length <= 20 || 'Le nom ne peut faire que 20 caractères maximum']"
        />
    </div>

    <div class="row q-mb-md">
      <q-input
        ref="description"
        filled
        v-model="plat.description"
        label="Description"
        type="textarea"
        class="col"
        :rules="[val => val.length <= 155 || 'La description ne peut faire que 155 caractères maximum']"/>
    </div>

    <div class="row q-mb-md">
      <q-input
        filled
        v-model="plat.image"
        label="URL de l'image"
        class="col" />
      <q-img
        :src="plat.image ? plat.image : require('../assets/cassoulet.jpg')"
        class="q-ml-sm"
        contain />
    </div>

    <div class="q-mb-md">
      <div class="row">
        <p class="q-mb-none">Note:</p>
      </div>
      <div class="row">
        <q-rating
          v-model="plat.note"
          size="2em"
          color="orange" />
      </div>
    </div>

  </q-card-section>

  <q-card-actions align="right">
    <q-btn
      label="Annuler"
      color="grey"
      v-close-popup />
    <q-btn
      @click="sauverPlat()"
      label="Sauver"
      color="primary"/>
  </q-card-actions>
</q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['action', 'platAModifier'],
  data () {
    return {
      plat: {
        id: 0,
        nom: '',
        description: '',
        note: 1,
        image: ''
      }
    }
  },
  mounted () {
    if (this.action === 'modifier') {
      // Préférer l'utilisation de structuredClone plutôt que de spread operator
      // this.plat = structuredClone(this.platAModifier)
      this.plat = { ...this.platAModifier }
    }
  },
  methods: {
    ...mapActions('plats', ['ajouterPlat', 'modifierPlat']),
    sauverPlat () {
      // TODO Exécuter les règles de validation
      this.$refs.nom.validate()
      this.$refs.description.validate()
      // Vérifie si les règles de validation sont respectées
      if (!this.$refs.description.hasError && !this.$refs.nom.hasError) {
        // Modifie ou ajoute le plat
        // TODO Créer une action sauverPlat qui gère l'ajout et la modification
        if (this.action === 'modifier') {
          this.modifierPlat(this.plat)
        } else {
          this.ajouterPlat(this.plat)
        }
      }
    }
  }
}
</script>
<!--
  * Ajoute `scoped`
  * Préférer l'utilisation de Sass ou SCSS https://sass-lang.com/guide
  * Ajouter `lang="sass"` pour activer Sass
-->
<style scoped lang="scss">
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
