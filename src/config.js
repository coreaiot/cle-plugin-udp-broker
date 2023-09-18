module.exports = {
  description: 'UDP Broker configurations.',
  fields: [
    {
      name: 'bindIp',
      type: 'text',
      description: 'IP to bind for UDP broker',
      placeholder: 'e.g. 0.0.0.0',
      value: '0.0.0.0',
    },
    {
      name: 'bindPort',
      type: 'number',
      description: 'Port to bind for UDP broker',
      placeholder: 'e.g. 55555',
      value: 55555,
    },
    {
      name: 'maxNumberOfSubscribers',
      type: 'number',
      description: 'Max Number of Subscribers. Zero for unlimited',
      placeholder: 'e.g. 3',
      value: 3,
    },
    {
      name: 'subscriberLifetime',
      type: 'number',
      description: 'Subscriber Lifetime (s). 0 for disabled',
      placeholder: 'e.g. 60',
      value: 0,
    },
    {
      name: 'postOutdatedTags',
      type: 'switch',
      description: 'Post outdated tags',
      value: false,
    },
  ],
};