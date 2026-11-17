export const BASE_TIME = '8:00 PM'
export const TIMES = ['7:00 PM', '8:00 PM', '9:00 PM']

export const KAREEM_HELP = {
  'Baby care': {
    msg: 'Could you take care of the baby tonight at 8:00 PM for about 2 hours? I really need some time to rest.',
    cta: (t) => `I'll take the baby at ${t}`,
    done: (t) => `Kareem is taking the baby at ${t}`,
  },
  'Keep me company': {
    msg: 'Could you keep me company tonight at 8:00 PM for about 2 hours? I really need someone near me.',
    cta: (t) => `I'll keep Sara company at ${t}`,
    done: (t) => `Kareem is keeping you company at ${t}`,
  },
}

export const NADIA_HELP = {
  'Cook lunch': {
    msg: "Could you cook lunch for us today by 1:30 PM, Tante Nadia? I'm really tired and could use some time to rest.",
    cta: "I'll cook lunch today",
    done: 'Tante Nadia is cooking lunch today',
  },
  'Bring food': {
    msg: "Could you bring us some food for lunch today by 1:30 PM, Tante Nadia? I'm really tired and could use some time to rest.",
    cta: "I'll bring lunch today",
    done: 'Tante Nadia is bringing lunch today',
  },
}

export const kMessage = (s) => s.edits['k:' + s.kHelp] ?? KAREEM_HELP[s.kHelp].msg
export const nMessage = (s) => s.edits['n:' + s.nHelp] ?? NADIA_HELP[s.nHelp].msg
