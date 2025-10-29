import InterestModel from '../models/interest.model';

const interests = [
  { name: 'Photography', iconName: 'fa-camera' },
  { name: 'Video Games', iconName: 'fa-gamepad' },
  { name: 'Travelling', iconName: 'fa-plane' },
  { name: 'Speeches', iconName: 'fa-microphone' },
  { name: 'Swimming', iconName: 'fa-swimmer' },
  { name: 'Extreme Sports', iconName: 'fa-biking' },
  { name: 'Cooking', iconName: 'fa-utensils' },
  { name: 'Music', iconName: 'fa-music' },
  { name: 'Shopping', iconName: 'fa-shopping-bag' },
  { name: 'Art & Crafts', iconName: 'fa-paint-brush' },
  { name: 'Drinking', iconName: 'fa-glass-cheers' },
  { name: 'Fitness', iconName: 'fa-dumbbell' },
  { name: 'Suggar Daddy', iconName: 'fa-' },
  { name: 'Suggar Mommy', iconName: 'fa-' },
];

export async function populateInterestsIfEmpty() {
  const count = await InterestModel.countDocuments();
  if (count === 0) {
    await InterestModel.insertMany(interests);
    console.log('[seed] Interesses mockados populados');
  }
}
