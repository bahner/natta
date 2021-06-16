import { Bed, Room } from '../models/index.mjs'

const rooms = [
  {
    desc: 'Rom mot landing',
    noBedsToCreate: 4
  },
  {
    desc: 'Rom med takvindue',
    noBedsToCreate: 2
  },
  {
    desc: 'Rom mot nord',
    noBedsToCreate: 4
  }
]

const bed = {
  desc: 'Køyeseng'
}

async function createBedInRoom (room, bed) {
  try {
    const b = await Bed.create({
      ...bed,
      room: room._id
    })
    await b.save()
    await Room.updateOne({ _id: room._id }, { $addToSet: { beds: b._id } },
      function (err, result) {
        if (err) { console.log(`Room.updateOne failed ${err}`); return err }
        console.log(`Room.updateOne worked with result ${JSON.stringify(result)}`)
        return result
      })
    // await Room.updateOne({ _id: room._id }, { $addToSet: { beds: b._id } },
    //   function (err, result) {
    //     if (err) { console.log(`Room.updateOne failed ${err}`); return err }
    //     console.log(`Room.updateOne worked with result ${JSON.stringify(result)}`)
    //     return result
    //   })
    console.log(`Created ${bed.desc} for room ${room._id}.`)
  } catch (err) {
    console.log(err)
  }
}

// async function removeBedFromRoom (roomId, bedId) {
//   await Bed.findByIdAndDelete({ _id: bedId })

//   await Room.updateOne({ _id: roomId }, { $pull: { beds: bedId } },
//     function (err, result) {
//       if (err) {
//         return err
//       } else {
//         return result
//       }
//     }
//   )
//   console.log(`Created ${bed} for room ${roomId}.`)
// }

async function createBedsForRoom (room) {
  let i
  console.log(`Creating ${room.noBedsToCreate} beds in ${room.desc}`)
  for (i = 0; i < room.noBedsToCreate; i++) {
    console.log(`Creating bed #${i} for room ${room.desc}(${room._id})`)
    createBedInRoom(room, bed)
  }
}

async function createRoomsWithBeds (rooms) {
  rooms.forEach(async (room) => {
    try {
      const _room = await Room.create(room)
      _room.save()
      await createBedsForRoom(_room)
    } catch (err) {
      console.log(err)
    }
  })
}

export const initRikssenter = async () => {
  await Room.findOne()
    .then(async (room) => {
      if (room === null) {
        console.log('No rooms defined creating some.')
        await createRoomsWithBeds(rooms)
      }
    })
    .catch(err => console.log(err))
}
