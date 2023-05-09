<template>
  <div class="num_card">
    <section
      v-for="item in props.cardList"
      :key="item.key"
      class="num_card_item"
      :style="{
        width: `${100 / props.cardList.length}%`
      }"
    >
      <section class="card_left flexClass">
        <article
          class="card_icon flexClass"
          :style="{ backgroundColor: item.iconBg || '#ffffff' }"
        >
          <a-popover v-if="item.slot" trigger="click">
            <template #content>
              <slot :name="item.key" :item="item" />
            </template>
            <article>
              <SvgIcon
                class="icons icons_chick"
                :style="{ color: item.iconColor || '#000000' }"
                :name="item.icon"
                :size="2"
                @click="handleCard(item.key)"
              />
            </article>
          </a-popover>
          <SvgIcon
            v-else
            class="icons"
            :style="{ color: item.iconColor || '#000000' }"
            :name="item.icon"
            :size="2"
          />
        </article>
      </section>
      <section class="card_context">
        <article class="card_title">
          {{ item.title }}
          <a-tooltip v-if="item.info" placement="top">
            <template #title>
              <span>{{ item.info }}</span>
            </template>
            <SvgIcon
              class="icons_info"
              :style="{ color: infoIconColor || '#e5e5e5' }"
              :name="infoIcon"
              :size="1"
            />
          </a-tooltip>
        </article>
        <article class="card_value">
          {{ item.value || '0' }}
          <span class="value_unit">{{ item.unit }}</span>
        </article>
      </section>
      <section class="card_right">
        <article class="card_icon flexClass">
          <!-- <a-tooltip placement="top">
            <template #title>
              <span>{{ item.info }}</span>
            </template>
            <SvgIcon class="icons_info" name="info" :size="1"/>
          </a-tooltip> -->
        </article>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

interface CardObj {
  icon?: string
  iconColor?: string
  iconBg?: string
  title: string
  value: number
  key: string | number
  info?: string
  unit?: string
  slot?: boolean
}

const emit = defineEmits(['handleCard'])
const props = defineProps({
  cardList: {
    type: Array as PropType<CardObj[]>,
    default: () => []
  },
  infoIcon: {
    type: String,
    default: ''
  },
  infoIconColor: {
    type: String,
    default: '#e5e5e5'
  }
})

const handleCard = (key: string | number) => {
  emit('handleCard', key)
}
</script>

<style lang="scss" scoped>
.num_card {
  width: 100%;
  display: flex;
  grid-gap: 15px;
  .num_card_item {
    // border: 1px solid #E9E9E9;
    height: 100px;
    background-color: #ffffff;
    padding: 25px 0;
    display: flex;
    justify-content: center;
    .card_left {
      width: 54px;
      .card_icon {
        width: 54px;
        height: 54px;
        border-radius: 8px;
        background-color: #02a7f0;
        .icons_chick {
          border: 0;
          cursor: pointer;
        }
        .icons {
          color: #ffffff;
        }
      }
    }
    .card_context {
      max-width: 140px;
      min-width: 80px;
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .card_title,
      .card_value {
        color: #333333;
        height: 20px;
        line-height: 20px;
        display: flex;
        justify-content: flex-start;
      }
      .card_title {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        .icons_info {
          cursor: pointer;
          position: relative;
          right: -5px;
          top: -5px;
        }
      }
      .card_value {
        font-size: 18px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        .value_unit {
          height: 20px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          margin-left: 10px;
        }
      }
    }
    .card_right {
      width: 20px;
      .card_icon {
        width: 54px;
        height: 54px;
        .icons_info {
          color: #9b9b9b;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
