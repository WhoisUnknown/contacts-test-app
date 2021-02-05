<template>
  <b-card
    :class="$s.card"
    :body-class="$s.cardBody"
    @click="show=!show">
    <div :class="$s.arrowBlock">
      <b-icon
        icon="chevron-right"
        :rotate="show ? 90 : 0"
        aria-hidden="true" />
    </div>
    <div class="w100">
      <div class="d-flex w100">
        <div class="w100">
          <div :class="$s.title">
            {{ item.firstName }} {{ item.lastName }}
          </div>
          <div :class="$s.subtitle">
            {{ item.jobTitle }} at {{ item.company }}
          </div>
        </div>
        <div class="d-flex align-items-center mr-2">
          <b-button
            :id="`popover-button-sync${_uid}`"
            :class="$s.popoverButton"
            @click.stop="showPopup = !showPopup">
            <b-icon
              icon="three-dots"
              aria-hidden="true" />
          </b-button>

          <b-popover
            :custom-class="$s.popover"
            :show.sync="showPopup"
            :triggers="['click','blur']"
            placement="bottomleft"
            :target="`popover-button-sync${_uid}`">
            <div :class="$s.list">
              <div
                :class="$s.listItem"
                @click="showPopup=false;$emit('openEditModal');">
                Edit
              </div>
              <div
                :class="$s.listItem"
                @click="showPopup=false;$emit('openRemoveModal')">
                Delete
              </div>
            </div>
          </b-popover>
        </div>
      </div>
      <template v-if="show">
        <div :class="$s.divider" />
        <table :class="$s.table">
          <tbody>
            <tr>
              <td>Country</td>
              <td>{{ item.country ? item.country.name : "unknown" }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <a
                  v-if="item.phone"
                  class="reset-link"
                  :href="`mailto:${item.email}`"
                  @click.stop>
                  {{ item.email }}
                </a>
              </td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>
                <a
                  v-if="item.phone"
                  class="reset-link"
                  :href="`tel:${item.phone}`"
                  @click.stop>
                  {{ item.phone }}
                </a>
                <template
                  v-else>
                  -
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      showPopup: false,
    };
  },
};
</script>

<style lang="scss" module="$s">
.card{
  margin-bottom: 10px;
  transition: background-color 0.3s;
  padding: 0;
  .cardBody{
    padding: 18.5px;
    display: flex;
    .arrowBlock{
      width: 14px;
      padding-top: 8px;
      margin-right: 18.5px;
      text-align: center;
      font-size: 12px;
    }
    .title{
      font-size: 16px;
      font-weight: bold;
    }
    .subtitle{
      font-size: 14px;
      font-weight: 300;
      color: #7F9893;
    }
  }
  .divider{
    margin:18.5px 0;
    border-top: 1px solid #DAE3DF;
  }
  .table{
    td:first-child{
      font-weight: bold;
      font-size: 14px;
      min-width: 71px;
    }
    td:last-child{
      font-weight: 300;
      font-size: 14px;
      min-width: 71px;
      color:#404F4C;
    }
  }
  .popoverButton{
    background-color: transparent;
    color: #404F4C;
    padding: 0;
    border: none;
  }
  &:hover{
    background-color: #F8FAF9;
  }
}
.list{
  .listItem{
    color: #43765A;
    min-width:170px;
    height: 38px;
    padding: 10px 20px;
    cursor: pointer;
    &:hover{
      background-color:#eee;
    }
  }
}
.popover {
  box-shadow: 0px 8px 25px #0000002B;
  border: 1px solid #AFC0BD;
  border-radius: 5px;
  opacity: 1;
  [class="arrow"]{
    opacity: 0;
  }
  [class="popover-body"]{
    padding: 6px 0;
  }
}
</style>
