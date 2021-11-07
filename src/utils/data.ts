import { IQuestion, IUser } from '../common/interfaces';

let users: IUser = {
  david: {
    id: 'david',
    name: 'David K. Greene',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA646543118713252.png',
    answers: {
      '6zpy2jovgbxpcjk2ecdwyl': 'optionOne',
      '1njhjuts54entulvjewiv': 'optionTwo',
      z9vvnx3xvwkobuphjw6i9: 'optionOne',
      fw5hnwbnjvd5ejwdtgaksi: 'optionOne',
    },
    questions: [],
  },
  melissa: {
    id: 'melissa',
    name: 'Melissa P. Bradford',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA294937090792206.png',
    answers: {
      '6zpy2jovgbxpcjk2ecdwyl': 'optionOne',
    },
    questions: [],
  },
  thomas: {
    id: 'thomas',
    name: 'Thomas W. Mengel',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA7100655269366061.png',
    answers: {
      '6zpy2jovgbxpcjk2ecdwyl': 'optionTwo',
      hcg0m5o5ne8mnnrbvtz9h: 'optionTwo',
      fw5hnwbnjvd5ejwdtgaksi: 'optionTwo',
      z9vvnx3xvwkobuphjw6i9: 'optionOne',
      '1njhjuts54entulvjewiv': 'optionTwo',
      j3od3ubw750w3c3mshms2c: 'optionOne',
    },
    questions: [],
  },
  robert: {
    id: 'robert',
    name: 'Robert C. Brown',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA6464894342527661.png',
    answers: {
      ne0xr9onz325lomrpo8va: 'optionOne',
    },
    questions: [],
  },
  linda: {
    id: 'linda',
    name: 'Linda B. Griffin',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA8379026134983469.png',
    answers: {},
    questions: [],
  },
  scott: {
    id: 'scott',
    name: 'Scott P. Carr',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA290414191302663.png',
    answers: {},
    questions: [],
  },
  joel: {
    id: 'joel',
    name: 'Joel S. Scott',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA794894408797836.png',
    answers: {},
    questions: [],
  },
  kristina: {
    id: 'kristina',
    name: 'Kristina B. Holloway',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA817473290214918.png',
    answers: {},
    questions: [],
  },
  anthony: {
    id: 'anthony',
    name: 'Anthony J. Cheek',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA939226466355644.png',
    answers: {},
    questions: [],
  },
  annie: {
    id: 'annie',
    name: 'Annie T. Daniels',
    avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA6239545299463118.png',
    answers: {
      '6zpy2jovgbxpcjk2ecdwyl': 'optionOne',
      '1njhjuts54entulvjewiv': 'optionOne',
      z9vvnx3xvwkobuphjw6i9: 'optionTwo',
    },
    questions: [],
  },
};

let questions: IQuestion = {
  okoppi5prcvgynqaaiyyc: {
    id: 'okoppi5prcvgynqaaiyyc',
    timestamp: 1636211375475,
    author: 'anthony',
    optionOne: {
      votes: [],
      text: 'lose your keys',
    },
    optionTwo: {
      votes: [],
      text: 'forget your cell phone',
    },
  },
  izbuq3p6otudfqsv180z: {
    id: 'izbuq3p6otudfqsv180z',
    timestamp: 1636211401423,
    author: 'anthony',
    optionOne: {
      votes: [],
      text: 'lose all your contacts',
    },
    optionTwo: {
      votes: [],
      text: 'lose $1000',
    },
  },
  h322lh6ootapxxcrsdv1gc: {
    id: 'h322lh6ootapxxcrsdv1gc',
    timestamp: 1636211437294,
    author: 'anthony',
    optionOne: {
      votes: [],
      text: 'stop using YouTube',
    },
    optionTwo: {
      votes: [],
      text: 'stop using Instagram',
    },
  },
  '8zqiywx64l5u6yz24b5kd': {
    id: '8zqiywx64l5u6yz24b5kd',
    timestamp: 1636211566522,
    author: 'david',
    optionOne: {
      votes: [],
      text: 'know the history of every object you touched',
    },
    optionTwo: {
      votes: [],
      text: 'be able to talk to animals',
    },
  },
  ne0xr9onz325lomrpo8va: {
    id: 'ne0xr9onz325lomrpo8va',
    timestamp: 1636211625299,
    author: 'david',
    optionOne: {
      votes: ['robert'],
      text: 'be the richest person in the world',
    },
    optionTwo: {
      votes: [],
      text: 'be immortal',
    },
  },
  j3od3ubw750w3c3mshms2c: {
    id: 'j3od3ubw750w3c3mshms2c',
    timestamp: 1636211701880,
    author: 'kristina',
    optionOne: {
      votes: ['thomas'],
      text: 'experience the world beginning',
    },
    optionTwo: {
      votes: [],
      text: 'ending',
    },
  },
  z9vvnx3xvwkobuphjw6i9: {
    id: 'z9vvnx3xvwkobuphjw6i9',
    timestamp: 1636211719902,
    author: 'kristina',
    optionOne: {
      votes: ['david', 'thomas'],
      text: 'have more money',
    },
    optionTwo: {
      votes: ['annie'],
      text: 'more time',
    },
  },
  '1ef5tgi6go5p7nrqgs12ci': {
    id: '1ef5tgi6go5p7nrqgs12ci',
    timestamp: 1636211777768,
    author: 'linda',
    optionOne: {
      votes: [],
      text: 'be super strong',
    },
    optionTwo: {
      votes: [],
      text: 'super fast',
    },
  },
  fw5hnwbnjvd5ejwdtgaksi: {
    id: 'fw5hnwbnjvd5ejwdtgaksi',
    timestamp: 1636211839502,
    author: 'melissa',
    optionOne: {
      votes: ['david'],
      text: ' win an Olympic Gold Medal',
    },
    optionTwo: {
      votes: ['thomas'],
      text: 'an Academy Award',
    },
  },
  '1njhjuts54entulvjewiv': {
    id: '1njhjuts54entulvjewiv',
    timestamp: 1636211884807,
    author: 'robert',
    optionOne: {
      votes: ['annie'],
      text: 'be famous for your dancing',
    },
    optionTwo: {
      votes: ['david', 'thomas'],
      text: 'famous for your singing',
    },
  },
  hcg0m5o5ne8mnnrbvtz9h: {
    id: 'hcg0m5o5ne8mnnrbvtz9h',
    timestamp: 1636211927403,
    author: 'joel',
    optionOne: {
      votes: [],
      text: 'be invisible',
    },
    optionTwo: {
      votes: ['thomas'],
      text: 'be able to fly',
    },
  },
  '6zpy2jovgbxpcjk2ecdwyl': {
    id: '6zpy2jovgbxpcjk2ecdwyl',
    timestamp: 1636212021327,
    author: 'annie',
    optionOne: {
      votes: ['annie', 'david', 'melissa'],
      text: 'live on a plant',
    },
    optionTwo: {
      votes: ['thomas'],
      text: 'beneath the sea',
    },
  },
};

export { users, questions };
