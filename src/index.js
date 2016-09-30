import dude from 'debug-dude'
const { /*debug,*/ log, info /*, warn, error*/ } = dude('bot')

const maxi = Math.floor((Math.random() * 20) + 1)
const snowball = Math.floor((Math.random() * 10) + 1)

import { version } from '../package.json'
info(`JoshBot v${version} starting`)

import config from '../config.json'

import { connect, message } from 'coffea'
export const htmlMessage = (msg) => {
  return {
    type: 'message',
    text: msg,
    options: {
      parse_mode: 'HTML'
    }
  }
}

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
      reply({
        chat: evt && evt.chat,
		    type: 'photo',
        data: fs.createReadStream(path.join(__dirname, `/../pic/maxi/${maxi}.jpg`))
      })
    break
    case 'snowball':
      reply({
        chat: evt && evt.chat,
        type: 'photo',
        data: fs.createReadStream(path.join(__dirname, `/../pic/snowball/${snowball}.jpg`))
      })
	break
    case 'version':
    reply(htmlMessage('JoshBot v0.0.6 - https://github.com/6697/hashtag-bot'))
	case 'issues':
    reply(htmlMessage('<b>Please report issues< <a href="https://github.com/6697/hashtag-bot/issues">here</a>'))
    break
  }
})


networks.on('message', (evt, reply) => {
  log('Received message event: %o', evt)

  let hashtags = evt.text.match(/#([a-zA-Z]+)/)

  if (hashtags && hashtags.length > 1) {
    let voicePath = path.join(__dirname, `/../voice/${hashtags[1]}.mp3`)

    if (fs.existsSync(voicePath)) {
      reply({
        chat: evt && evt.chat,
        type: 'voice',
        data: fs.createReadStream(voicePath)
      })
    }
  }
})

networks.on('message', (evt, reply) => {
  let video = evt.text.match(/#([a-zA-Z]+)/)

  if (video && video.length > 1) {
    let videoPath = path.join(__dirname, `/../video/${video[1]}.mp4`)

    if (fs.existsSync(videoPath)) {
      reply({
        chat: evt && evt.chat,
        type: 'video',
        data: fs.createReadStream(videoPath)
      })
    }
  }
})

networks.on('message', (evt, reply) => {
  let pic = evt.text.match(/#([a-zA-Z]+)/)

  if (pic && pic.length > 1) {
    let photoPath = path.join(__dirname, `/../pic/etc/${pic[1]}.jpg`)

    if (fs.existsSync(photoPath)) {
      reply({
        chat: evt && evt.chat,
        type: 'photo',
        data: fs.createReadStream(photoPath)
      })
    }
  }
})

networks.on('message', (evt, reply) => {
  let sticker = evt.text.match(/#([a-zA-Z]+)/)

  if (sticker && sticker.length > 1) {
    let stickerPath = path.join(__dirname, `/../sticker/${sticker[1]}.webp`)

    if (fs.existsSync(stickerPath)) {
      reply({
        chat: evt && evt.chat,
        type: 'sticker',
        data: fs.createReadStream(stickerPath)
      })
    }
  }
})
