<template>
  <div :class="$s.container">
    <div class="d-flex justify-content-between align-items-center">
      <div :class="$s.title">
        Contacts
      </div>
      <b-button
        :class="$s.addButton"
        size="md"
        variant="success"
        @click="openEditOrCreateModal()">
        Add
      </b-button>
    </div>
    <div>
      <b-form-input
        :value="contactsFilters.search"
        :class="$s.search"
        placeholder="Search by name, company or email"
        @input="updateSearch" />
    </div>
    <div :class="$s.resultInfo">
      {{ resultInfo }}
    </div>

    <div>
      <ContactCard
        v-for="contact in contactsList"
        :key="contact.id"
        :item="contact"
        @openEditModal="openEditOrCreateModal(contact)"
        @openRemoveModal="openRemoveModal(contact)" />
    </div>
    <ModalCreateOrEdit :item="editItem" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import * as _ from '@/store/modules/Contacts/mutations-types.js';
import * as $ from '@/store/modules/Contacts/actions-types.js';
import ContactCard from './Components/ContactCard';
import ModalCreateOrEdit from '@pages/Contacts/Modals/CreateOrEdit';
export default {
  name: 'ContactsList',
  components: {
    ContactCard,
    ModalCreateOrEdit,
  },
  data() {
    return {
      nextRequest: null,
      editItem: null,
    };
  },
  computed: {
    ...mapState('Contacts', [
      'loadingList',
      'contactsList',
      'contactsFilters',
    ]),
    resultInfo() {
      let res = 'loading';
      if (!this.loadingList) {
        switch (this.contactsList.length) {
          case 0: {
            res = 'Nothing found';
            break;
          }
          case 1: {
            res = '1 contact found';
            break;
          }
          default: {
            res = `${this.contactsList.length} contacts found`;
          }
        }
      }
      return res;
    },
  },
  watch: {
    contactsFilters: {
      immediate: true,
      handler(newVal) {
        // если во время загрузки фильтры поменялись, то нужно будет делать запрос снова
        if (this.loadingList) {
          this.makeRequestAgain = true;
        } else {
          this[$.GET_CONTACTS_LIST](newVal);
        }
      },
    },
    loadingList: {
      handler(newVal) {
        if (!newVal && this.makeRequestAgain) {
          this.makeRequestAgain = false;
          this[$.GET_CONTACTS_LIST](this.contactsFilters);
        }
      },
    },
  },
  methods: {
    ...mapActions('Contacts', [
      $.GET_CONTACTS_LIST,
      $.REMOVE_CONTACT,
    ]),
    ...mapMutations('Contacts', [
      _.SET_FILTERING_PROPS,
    ]),
    updateSearch(val) {
      this[_.SET_FILTERING_PROPS]({
        search: val,
      });
    },
    openEditOrCreateModal(item = null) {
      this.editItem = item;
      this.$bvModal.show('create-or-edit');
    },
    openRemoveModal(item) {
      this.$bvModal.msgBoxConfirm(`Are you sure you want to delete the contact: ${item.firstName} ${item.lastName}`, {
        title: 'Confirmation',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        modalClass: 'ui-modal',
        centered: true,
      }).then(value => {
        if (value) {
          this[$.REMOVE_CONTACT](item.id);
        }
      });
    },
  },
};
</script>

<style lang="scss" module="$s">
.container{
  max-width: 650px;
  margin-top: 120px;
}
.title{
  font-size:24px;
  font-weight: bold;
}
.addButton{
  width: 72px;
  height: 38px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
}
.search{
  margin-top:15px;
  border: 2px solid #DFE7E3;
  height: 50px;
  &::placeholder {
    color: #AFC0BD;
    font-size:14px;
    font-weight: 500;
  }
}
.resultInfo{
  margin: 25px 0;
  text-align: center;
  color: #7F9893;
  font-weight:300;
  font-size:16px;
}
</style>
