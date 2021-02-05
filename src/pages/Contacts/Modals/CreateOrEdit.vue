<template>
  <b-modal
    id="create-or-edit"
    modal-class="ui-modal"
    :title="isEdit ? 'Edit' : 'Add'"
    centered>
    <div>
      <div class="d-flex">
        <b-form-row>
          <b-col>
            <TemplateInput
              required
              label="First name"
              label-for="input-1"
              :invalid-feedback="$v.fields.firstName.$error ? 'Поле заполнено неверно' : ''">
              <b-form-input
                id="input-1"
                v-model="fields.firstName"
                class="ui-input"
                name="name"
                :state="$v.fields.firstName.$error ? false : null"
                trim
                @change="$v.fields.firstName.$touch()" />
            </TemplateInput>
          </b-col>
          <b-col>
            <TemplateInput
              required
              label="Last name"
              label-for="input-2"
              :invalid-feedback="$v.fields.lastName.$error ? 'Поле заполнено неверно' : ''">
              <b-form-input
                id="input-2"
                v-model="fields.lastName"
                class="ui-input"
                name="last-name"
                :state="$v.fields.lastName.$error ? false : null"
                trim
                @change="$v.fields.lastName.$touch()" />
            </TemplateInput>
          </b-col>
        </b-form-row>
      </div>

      <TemplateInput
        required
        label="Email"
        label-for="input-3"
        :invalid-feedback="$v.fields.email.$error ? 'Поле заполнено неверно' : ''">
        <b-form-input
          id="input-3"
          v-model="fields.email"
          class="ui-input"
          name="email"
          :state="$v.fields.email.$error ? false : null"
          trim
          @change="$v.fields.email.$touch()" />
      </TemplateInput>

      <TemplateInput
        label="Company"
        label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="fields.company"
          class="ui-input"
          name="company"
          trim />
      </TemplateInput>
      <TemplateInput
        label="Job title"
        label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="fields.jobTitle"
          class="ui-input"
          name="jobTitle"
          trim />
      </TemplateInput>
      <TemplateInput
        label="Phone"
        label-for="input-6">
        <Multiselect
          v-model="fields.country"
          placeholder="Select country"
          :options="countries"
          track-by="id"
          label="name" />
      </TemplateInput>
      <TemplateInput
        label="Phone"
        label-for="input-7">
        <b-form-input
          id="input-7"
          v-model="fields.phone"
          class="ui-input"
          name="phone"
          trim />
      </TemplateInput>
    </div>
    <template #modal-footer>
      <b-button
        size="md"
        variant="success"
        :disabled="loading || $v.fields.$invalid"
        :class="$s.saveButton"
        @click="saveOrAdd">
        {{ isEdit ? 'Edit' : 'Add' }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import TemplateInput from '@/components/Inputs/TemplateInput';
import Multiselect from '@/components/Inputs/Multiselect';
import { required, email } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';
import * as $ from '@/store/modules/Contacts/actions-types.js';

export default {
  name: 'CreateOrEdit',
  components: {
    TemplateInput,
    Multiselect,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    const initialFields = {
      firstName: '',
      lastName: '',
      company: '',
      jobTitle: '',
      country: { id: 1, name: 'Russia' },
      email: '',
      phone: '',
    };
    return {
      initialFields: { ...initialFields },
      fields: { ...initialFields },
      isEdit: false,
      loading: false,
    };
  },
  computed: {
    ...mapState('Contacts', [
      'countries',
    ]),
  },
  watch: {
    item: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fields = { ...newVal };
          this.isEdit = true;
        } else {
          this.fields = { ...this.initialFields };
          this.isEdit = false;
        }
      },
    },
  },
  validations: {
    fields: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    ...mapActions('Contacts', [
      $.ADD_CONTACT,
      $.EDIT_CONTACT,
    ]),
    async saveOrAdd() {
      if (!this.$v.fields.$invalid) {
        this.loading = true;
        if (this.isEdit) {
          await this[$.EDIT_CONTACT]({ id: this.fields.id, data: this.fields });
        } else {
          await this[$.ADD_CONTACT](this.fields);
        }
        this.loading = false;
        this.$bvModal.hide('create-or-edit');
      }
    },
  },
};
</script>

<style lang="scss" module="$s">
.saveButton{
  width: 72px;
  height: 50px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
}
</style>
