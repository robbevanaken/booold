<template>
    <section class="c-featured-cases" data-theme-section="dark">
        <div class="c-featured-cases__slider" data-horizontal-scroll-wrap data-horizontal-scroll-disable="mobileLandscape">
            <div class="o-container o-grid">
                <div class="col-span-12 lg:col-span-10 lg:col-start-2">
                    <h2 class="c-featured-cases__title">Featured Projects</h2>
                </div>
            </div>
            <div class="o-container o-grid">
                <div class="col-span-12 md:col-span-10 lg:col-span-8 lg:col-start-2">
                    <div class="c-featured-cases__wrapper">
                        <div class="c-featured-cases__panel" data-horizontal-scroll-panel v-for="(caseItem, index) in cases" :key="index">
                            <a class="c-featured-case__wrapper" :aria-label="caseItem.title" target="_blank" :href="caseItem.link" data-cursor-case>
                                <div class="c-featured-case">
                                    <div class="c-featured-case__image">
                                        <img :src="caseItem.src" :alt="caseItem.alt">
                                    </div>
                                    <div class="c-featured-case__content">
                                        <h3 class="c-featured-case__title">{{ caseItem.title }}</h3>
                                        <p class="c-featured-case__description">{{ caseItem.description }}</p>
                                        <div class="c-featured-case__tags">
                                            <span class="c-featured-case__tag" v-for="(tag, index) in caseItem.tags" :key="index">{{ tag }}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const cases = [
    {
        title: 'NGIS Wireless',
        description: 'A custom Wordpress template for a major 5G solutions provider.',
        src: '/images/reel/mockup-ngis.webp',
        alt: 'Website for NGIS Wireless',
        link: 'https://ngis-wireless.com',
        tags: ["Wordpress", "PHP", "Javascript"]
    },
    {
        title: 'De Wilde – Braems',
        description: 'A custom Wordpress template for a contractor.',
        src: '/images/reel/mockup-dwb.webp',
        alt: 'Website for De Wilde - Braems',
        link: 'https://dewilde-braems.be/',
        tags: ["Wordpress", "PHP", "Javascript"]
    },
]
</script>
