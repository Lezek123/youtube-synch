import {getMatchingFrequenciesForDate, MessageBus, SyncService, YtClient} from '@joystream/ytube'


export const handler = async (event: any, context: any) => {
  const youtubeClient = YtClient.create(
    '79131856482-fo4akvhmeokn24dvfo83v61g03c6k7o0.apps.googleusercontent.com',
    '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',
    'http://localhost:3000'
  );
  console.log('This is log')
  const date = new Date(event.time);
  const frequencies = getMatchingFrequenciesForDate(date);
  if(frequencies.length === 0)
    return;
  await new SyncService(
    youtubeClient,
    new MessageBus('eu-west-1')
  ).startIngestionFor(frequencies);
};
