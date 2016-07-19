import dude from 'debug-dude'
const { /*debug,*/ log, info /*, warn, error*/ } = dude('bot')

import { version } from '../package.json'
info(`jdnet bot v${version} starting`)

import config from '../config.json'

import { connect, message } from 'coffea'
const networks = connect(config)

import fs from 'fs'
import path from 'path'
import http from 'http'

networks.on('command', (evt, reply) => {
  log('Received command event: %o', evt)

  switch (evt.cmd) {
    case 'say':
      reply(message(evt.channel, evt.args.join('')))
    break
    case 'maxi':
      let maxi = Math.floor((Math.random() * 20) + 1)
      reply({
        type: 'sendPhoto',
        action: 'upload_photo',
        id: evt.channel,
        photo: fs.createReadStream(path.join(__dirname, `pic/${maxi}.jpg`))
      })
    break
      case 'snowball':
      let snowball = Math.floor((Math.random() * 10) + 1)
      reply({
        type: 'sendPhoto',
        action: 'upload_photo',
        id: evt.channel,
        photo: fs.createReadStream(path.join(__dirname, `/../pic/snowball/${snowball}.jpg`))
      })
  }
})


networks.on('message', (evt, reply) => {
  log('Received message event: %o', evt)

  let hashtags = evt.text.match(/#([a-zA-Z]+)/)

  if (hashtags && hashtags.length > 1) {
  reply({
    type: 'sendVoice',
    action: 'record_audio',
    id: evt.channel,
    voice: fs.createReadStream(path.join(__dirname, `voice/${hashtags[1]}.mp3`))
  })}
})
networks.on('message', (evt, reply) => {
  let video = evt.text.match(/#([a-zA-Z]+)/)

  if (video && video.length > 1) {
  reply({
    type: 'sendVideo',
    action: 'record_video',
    id: evt.channel,
    video: fs.createReadStream(path.join(__dirname, `video/${video[1]}.mp4`))
  })}
})
networks.on('message', (evt, reply) => {
  let pic = evt.text.match(/#([a-zA-Z]+)/)

  if (pic && pic.length > 1) {
  reply({
    type: 'sendPhoto',
    action: 'upload_photo',
    id: evt.channel,
    photo: fs.createReadStream(path.join(__dirname, `pic/etc/${pic[1]}.jpg`))
  })}
})

networks.on('message', function (evt, reply) {
  var sticker = evt.text.match(/#([a-zA-Z]+)/);

  if (sticker && sticker.length > 1) {
    reply({
      type: 'sendSticker',
      action: 'upload_photo',
      id: evt.channel,
      sticker: _fs2.default.createReadStream(_path2.default.join(__dirname, '/../sticker/' + sticker[1] + '.webp'))
    });
  }
});
