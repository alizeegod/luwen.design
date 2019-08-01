<template>
    <div class="box">
        <section class="aplayer">
            <no-ssr>
                <aplayer autoplay
                         :music="music"
                         :list="list"
                         listMaxHeight="200px"
                />
            </no-ssr>

        </section>
        <section class="container">
            <section class="wordcloud" id="wordcloud"></section>

        </section>
    </div>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import wordList from '../static/wordList'

    export default {
        fetch({ store }) {
            return Promise.all([
                store.dispatch('music/fetchPlayList', {uid: 56305297}),
                store.dispatch('music/fetchPlayListDetail', {id: 55224406})
            ])
        },
        computed: {
            playList() {
                return this.$store.state.music.playList
            },
            playListDetail() {
                return this.$store.state.music.playListDetail
            },
            songDetail() {
                return this.$store.state.music.songDetail
            },
            songIds() {
                return this.playListDetail.tracks.map(song => song.id)
            },
            songs() {
                return this.playListDetail.tracks.map(song => {
                    return {
                        id: song.id,
                        title: song.name,
                        artist: song.al.name,
                        src: '',
                        pic: song.al.picUrl
                    }
                })
            }
        },
        data() {
            return {
                music: {
                    title: 'secret base~君がくれたもの~',
                    artist: 'Silent Siren',
                    src: 'http://m7.music.126.net/20190801162808/83d076e148791b82d678636ebbaceace/ymusic/5b06/2890/55c0/b4201bcf1f6135427ad0cf1b667c6451.mp3',
                    pic: 'http://p2.music.126.net/fzy5I3GvAjiDfwhIEbgXuw==/109951163062323125.jpg'
                },
                list: []
            }
        },
        components: {
            Logo
        },
        mounted() {
            this.$nextTick(function() {
                this.wcInit()
                this.getSongUrls()
                console.log(this.songs)
            })
        },
        methods: {
            getSongUrls() {
                const self = this
                console.log(this.songIds.toString())
                this.$axios.$get('/song/url?id=' + this.songIds.toString())
                    .then(response => {
                        console.log(response)


                        self.list = self.songs.map(song => {

                            let s = response.data.find(function(ele) {
                                return ele.id == song.id
                            })
                            // if (s.url == null) {
                            //     delete song
                            //     return
                            // }
                            song.src = s.url
                            return song
                        })

                        self.list = self.list.filter(item => {
                            console.log(item.src)
                            return item.src != null
                        })
                        self.music = self.list[0]
                        console.log(self.list)
                    })
                    .catch(error => console.log(error))
            },
            wcInit() {

                let wc = new Js2WordCloud(document.getElementById('wordcloud'))
                wc.setOption({
                    // tooltip: {
                    //     show: true,
                    //     formatter: function(item) {
                    //         return item[0] + ': 价值¥' + item[1] + '<br>' + '词云图'
                    //     }
                    // },
                    list: wordList,
                    color: 'random-dark',
                    shape: 'circle',
                    // imageShape: 'http://feed.youshu.cc/readwith/media/picture/5d3e9e18c8215.jpg',
                    // imageShape: './luwen.jpg',
                    ellipticity: 1,
                    minRotation: -1.57080,
                    maxRotation: -1.57080,
                    rotateRatio: .4,
                    fontSizeFactor: 5,                                    // 当词云值相差太大，可设置此值进字体行大小微调，默认0.1
                    maxFontSize: 60,                                        // 最大fontSize，用来控制weightFactor，默认60
                    minFontSize: 20,
                    gridSize: 10,
                    // ratationSteps: 2,
                    // rotationRation: .5,
                    // shuffle: 30
                    // shape: 'circle',
                    // cardioid: 'diamond'
                    cardioid: 'square'
                })

                // window.onresize = function() {
                //     wc.resize()
                // }
            }
        }
    }
</script>

<style lang="less">

    .container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        .wordcloud {
            width: 500px;
            min-height: 500px;
        }
    }
</style>
