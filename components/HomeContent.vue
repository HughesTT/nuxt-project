<template>
  <div class="home-content">
    <!-- 藍芽區塊 -->
    <section class="bluetooth-section">
      <div class="bluetooth-container">
        <div class="bluetooth-content">
          <div class="content-box">
            <h2 class="title-gradient">無線自由 真實聲音</h2>
            <h3 class="subtitle-accent">親耳感受</h3>
            <p class="description">無論身處健身房、辦公室或任何場所，都能全心投入、保持專注。</p>
            <button class="category-btn" @click.prevent="toCategory('bluetooth')">
              <span>藍芽</span>
              <div class="btn-shine"></div>
            </button>
          </div>
        </div>
        <div class="bluetooth-image">
          <div class="image-gradient-overlay"></div>
          <img :src="homesectionImg" alt="無線耳機">
        </div>
      </div>
    </section>

    <!-- 降噪區塊 -->
    <section class="noise-section">
      <div class="section-bg" :style="{ backgroundImage: `url(${noisecancelingBg})` }">
        <div class="content-overlay">
          <div class="content-box">
            <h2 class="title-gradient">全面提升聆聽體驗</h2>
            <p class="description">優異的設計和奢華的材質，提供無與倫比的舒適。讓您的音樂感受達到更高的新境界。</p>
            <p class="description">世界一流的消噪效能，比以往更安靜。突破性空間感音場，讓人聆聽時更沉醉其中。</p>
            <button class="category-btn" @click.prevent="toCategory('noise-canceling')">
              <span>降噪</span>
              <div class="btn-shine"></div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 電競區塊 -->
    <section class="gaming-section">
      <div class="section-bg" :style="{ backgroundImage: `url(${gamingBg})` }">
        <div class="content-overlay content-overlay-right">
          <div class="content-box">
            <h2 class="title-gradient">超長續航 遊戲不斷</h2>
            <p class="description">如果電競是你的天命，那就戴上與頂尖電競專業玩家聯合設計的終極無線耳麥，正面迎戰激烈的遊戲戰場。</p>
            <p class="description">專為滿足極致需求而生，帶給你清晰音訊、進階的噪音隔離效果，以及適合全日使用的舒適。</p>
            <button class="category-btn" @click.prevent="toCategory('gaming')">
              <span>電競</span>
              <div class="btn-shine"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>