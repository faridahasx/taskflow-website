"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let quotes = [
  [
    `Good, better, best. Never let it rest. 'Til your good is better and your better is best.`,
    "St. Jerome",
  ],
  [`If you're going through hell, keep going.`, `Winston Churchill`],
  [`It always seems impossible until it's done.`, `Nelson Mandela`],
  [
    `Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. `,
    `Thomas A. Edison `,
  ],
  [
    `Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy.`,
    `Norman Vincent Peale`,
  ],
  [
    `Life is 10% what happens to you and 90% how you react to it.`,
    ` Charles R. Swindoll`,
  ],
  [
    `Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.`,
    `Helen Keller`,
  ],
  [`Quality is not an act, it is a habit.`, `Aristotle`],
  [
    `When something is important enough, you do it even if the odds are not in your favor.`,
    ` Elon Musk`,
  ],
  [`We aim above the mark to hit the mark. `, `Ralph Waldo Emerson `],
  [
    `Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.`,
    `Samuel Beckett `,
  ],
  [
    `Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.`,
    `Lao Tzu `,
  ],
  [`Start where you are. Use what you have. Do what you can. `, `Arthur Ashe `],
  [
    `With the new day comes new strength and new thoughts.`,
    `Eleanor Roosevelt`,
  ],
  [
    `Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.`,
    `Buddha`,
  ],
  [
    `Life is like riding a bicycle. To keep your balance, you must keep moving.`,
    `Albert Einstein `,
  ],
  [`Believe you can and you're halfway there.`, `Theodore Roosevelt`],
  [`Do what you can, with what you have, where you are.`, `Theodore Roosevelt`],
  [
    `It's not what you look at that matters, it's what you see. `,
    `Henry David Thoreau`,
  ],
  [
    `If we can really understand the problem, the answer will come out of it, because the answer is not separate from the problem.`,
    "J. Krishnamurti",
  ],
  [
    `You can have anything you want if you are willing to give up the belief that you can’t have it.`,
    `Dr. Robert Anthony`,
  ],
  [
    `Confidence comes not from always being right but from not fearing to be wrong.`,
    `Peter T. McIntyre`,
  ],
  [
    `Nothing can stop the man with the right mental attitude from achieving his goal; nothing on earth can help the man with the wrong mental attitude.`,
    `Thomas Jefferson `,
  ],
  [
    `You yourself, as much as anybody in the entire universe, deserve your love and affection.`,
    `Buddha`,
  ],
  [
    `I prefer to be true to myself, even at the hazard of incurring the ridicule of others, rather than to be false, and to incur my own abhorrence.`,
    `Frederick Douglass
        `,
  ],
  [
    `Inaction breeds doubt and fear. Action breeds confidence and courage. If you want to conquer fear, do not sit home and think about it. Go out and get busy.`,
    `Dale Carnegie`,
  ],
  [
    `What lies behind us and what lies before us are tiny matters compared to what lies within us.`,
    `Henry Stanley Haskins`,
  ],
  [
    `Man conquers the world by conquering himself.`,
    `Zeno of Citium (Founder of Stoicism)`,
  ],
  [`To be calm is the highest achievement of the self.`, `Zen proverb`],
  [
    `Success is based off of your willingness to work your ass off no matter what obstacles are in your way.`,
    `David Goggins`,
  ],
  [
    `When someone is properly grounded in life, they shouldn’t have to look outside themselves for approval.`,
    `Epictetus`,
  ],
  [
    `To bear trials with a calm mind robs misfortune of its strength and burden.`,
    `Seneca`,
  ],
  [
    `The ultimate power in life is to be completely self-reliant, completely yourself.`,
    ` Robert Greene`,
  ],
  [
    `Too many people believe that everything must be pleasurable in life.`,
    ` Robert Greene`,
  ],
  [`The whole future lies in uncertainty: live immediately.`, `Seneca`],
  [
    `Just keep in mind: the more we value things outside our control, the less control we have`,
    `Epictetus`,
  ],
  [
    `A rational person can find peace by cultivating indifference to things outside of their control.`,
    `Naval Ravikant`,
  ],
  [`Fate leads the willing, and drags along the reluctant.`, `Seneca`],
  [`The mind that is anxious about future events is miserable.`, `Seneca`],
  [
    `Relentlessly prune bullshit, don’t wait to do things that matter, and savor the time you have. `,
    `Paul Graham`,
  ],
  [`Be a master of the mind, not mastered by the mind.`, `Zen proverb`],
  [
    `The more you seek the uncomfortable, the more you will become comfortable.`,
    `Conor McGregor`,
  ],
  [
    `Between stimulus and response, there is a space. In that space is our power to choose our response.`,
    `Viktor Frankl`,
  ],
  [
    `To make a goal of comfort or happiness has never appealed to me; a system of ethics built on this basis would be sufficient only for a herd of cattle.`,
    `Albert Einstein`,
  ],
  [
    "The tranquility that comes when you stop caring what they say. Or think, or do. Only what you do. ",
    "Marcus Aurelius",
  ],
  [
    "If you make happiness your goal, you’ll be disappointed. If you make presence your goal, you’ll be peaceful. ",
    "Maxime Lagacé",
  ],
  ["If it’s endurable, then endure it. Stop complaining.", "Marcus Aurelius"],
  [
    "Failure and deprivation are the best educators and purifiers.",
    "Albert Einstein",
  ],
  [
    "That one wants nothing to be different, not forward, not backwards, not in all eternity. Not merely bear what is necessary, still less conceal it… but love it.",
    "Friedrich Nietzsche",
  ],
  [
    "The first rule is to keep an untroubled spirit. The second is to look things in the face and know them for what they are. ",
    "Marcus Aurelius",
  ],
  [
    "The great law of nature is that it never stops. There is no end.",
    "Ryan Holiday",
  ],
  ["Don’t explain your philosophy. Embody it.", "Epictetus"],
  ["Decision is the ultimate power. Decisions shape destiny. ", "Tony Robbins"],
  ["It does not matter what you bear, but how you bear it.", "Seneca"],
  [
    "Stoicism is about the domestication of emotions, not their elimination. ",
    "Nassim Nicholas Taleb",
  ],
  [
    "The best math you can learn is how to calculate the future cost of current decisions.",
    "Wesley Snipes",
  ],
  [
    `Stoicism, understood properly, is a cure for a disease. The disease in question is the anxiety, grief, fear, and various other negative emotions that plague humans and prevent them from experiencing a joyful existence.`,
    "William B. Irvine",
  ],
  [
    "Don’t mourn over your bad decisions. Just start overcoming them with good ones.",
    "Joyce Meyer",
  ],
  [
    "Sometimes life hits you in the head with a brick. Don’t lose faith.",
    "Steve Jobs",
  ],
  [
    "The true hero is one who conquers his own anger and hatred. ",
    "Dalai Lama",
  ],
  [
    "Waste no more time arguing what a good man should be, be one. ",
    "Marcus Aurelius",
  ],
  [
    "A gem cannot be polished without friction, nor a man perfected without trials. ",
    "Seneca",
  ],
  [
    "He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has. ",
    "Epictetus",
  ],
  [
    "What you’re supposed to do when you don’t like a thing is change it. If you can’t change it, change the way you think about it. Don’t complain.",
    "Maya Angelou",
  ],
  [
    "You have power over your mind — not outside events. Realize this, and you will find strength.",
    " Marcus Aurelius",
  ],
  [
    "Set aside a certain number of days during which you shall be content with the scantiest and cheapest fare, with coarse and rough dress, saying to yourself the while, “Is this the condition that I feared?”",
    "Seneca",
  ],
  ["What is to give light must endure burning.", " Viktor Frankl"],
  [
    "Life is a shipwreck, but we must not forget to sing in the lifeboats.",
    " Voltaire",
  ],
  [
    "What we fear doing most is usually what we most need to do.",
    " Tim Ferriss",
  ],
  [
    "It is not daily increase but daily decrease, hack away the unessential. The closer to the source, the less wastage there is.",
    "Bruce Lee",
  ],
  ["He has the most who is content with the least.", " Diogenes"],
  [
    "The reason why we have two ears and only one mouth is so we might listen more and talk less.",
    " Zeno of Citium",
  ],
  [
    "If you are irritated by every rub, how will your mirror be polished? ",
    "Rumi",
  ],
  ["Nothing endures but change.", " Heraclitus"],
  [
    "Why should we pay so much attention to what the majority thinks?",
    " Socrates",
  ],
  ["Be tolerant with others and strict with yourself.", " Marcus Aurelius"],
  ["No human thing is of serious importance.", " Plato"],
  ["Ensure you endure. ", "Maxime Lagacé"],
  [
    "You do not choose your problems. You choose how you react to them.",
    " Dan Go ",
  ],
  [
    "Self-control is strength. Right thought is mastery. Calmness is power. ",
    "James Allen",
  ],
  ["The obstacle is the way.", " Ryan Holiday"],
  ["What we desire makes us vulnerable.", " Ryan Holiday (The Daily Stoic)"],
  ["Move toward resistance and pain.", " Robert Greene"],
  [
    "Uncertainty is an uncomfortable position. But certainty is an absurd one.",
    " Voltaire",
  ],
  ["Discomfort is the currency of success.", " Brooke Castillo"],
  ["Show people, don’t tell people.", " David Goggins"],
  ["Discomfort is a wise teacher.", " Caroline Myss"],
  [
    "What are the secret of success? One word answer: “rational”.",
    "Charlie Munger",
  ],
  ["To be evenminded is the greatest virtue.", "Heraclitus"],
  ["To complain is always nonacceptance of what is.", " Eckhart Tolle"],
  ["If it doesn’t challenge you, it won’t change you. ", "Unknown"],
  ["Be present above all else. ", "Naval Ravikant"],
  ["Don’t aim to be perfect. Aim to be antifragile.", "Nassim Nicholas Taleb"],
  ["Hard choices, easy life. Easy choices, hard life. ", "Jerzy Gregorek"],
  [
    "Keep your intention pure. Emotions will try to distract you. So keep going. That’s the cure. ",
    "Maxime Lagacé",
  ],
  ["Be stoic: Just do the right thing. Just keep going. ", "Maxime Lagacé"],
  [
    "Do what you will. Even if you tear yourself apart, most people will continue doing the same things. ",
    "Marcus Aurelius",
  ],
  [
    "Wisdom starts when you no longer need short-term rewards.",
    "Maxime Lagacé",
  ],
  [
    "It can ruin your life only if it ruins your character. Otherwise it cannot harm you — inside or out.",
    "Marcus Aurelius",
  ],
  [
    "Every hour focus your mind attentively…on the performance of the task in hand, with dignity, human sympathy, benevolence and freedom, and leave aside all other thoughts. You will achieve this, if you perform each action as if it were your last.",
    "Marcus Aurelius",
  ],
  [
    "Control your perceptions. Direct your actions properly. Willingly accept what’s outside your control. ",
    "Ryan Holiday ",
  ],
  ["What you are not changing, you are choosing. ", "Unknown"],
  [
    "In life, it doesn’t matter what happens to you or where you came from. It matters what you do with what happens and what you’ve been given. ",
    "Ryan Holiday",
  ],
  [
    "Never let people who choose the path of least resistance steer you away from your chosen path of most resistance.",
    "David Goggins",
  ],
  [
    "Give yourself fully to your endeavors. Decide to construct your character through excellent actions and determine to pay the price of a worthy goal. The trials you encounter will introduce you to your strengths.",
    "Epictetus",
  ],
  [
    "To be stoic is not to be emotionless, but to remain unaffected by your emotions.",
    "James Pierce",
  ],
  [
    "Now is the time to get serious about living your ideals. How long can you afford to put off who you really want to be? Your nobler self cannot wait any longer.Put your principles into practice – now. Stop the excuses and the procrastination. This is your life! […] Decide to be extraordinary and do what you need to do – now.",
    "Epictetus",
  ],
  ["Make the mind tougher by exposing it to adversity.", "Robert Greene"],
  [
    "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    " Marcus Aurelius",
  ],
  [
    "As each day arises, welcome it as the very best day of all, and make it your own possession. We must seize what flees.",
    "Seneca",
  ],
  [
    "Inwardly, we ought to be different in every respect, but our outward dress should blend in with the crowd.",
    "Seneca",
  ],
  [
    "Be so busy building your own life that other people’s bullshit is of no concern.",
    "Ed Latimore",
  ],
  [
    "Every decision you make reflects your evaluation of who you are. ",
    "Marianne Williamson",
  ],
  [
    "We are quick to forget that just being alive is an extraordinary piece of good luck, a remote event, a chance occurrence of monstrous proportions. ",
    "Nicholas Nassim Taleb",
  ],
  ["Difficulty is what wakes up the genius.", "Nassim Nicholas Taleb"],
  ["Believe you can and you’re halfway there. ", "Theodore Roosevelt"],
  [
    "Life can only be understood backwards; but it must be lived forwards. ",
    " Søren Kierkegaard",
  ],
  [
    "Effective decision-making can be seen as an optimal link between memory of the past, ground-realities of the present and insights of the future.",
    " Amit Ray",
  ],
  [
    "If you spend too much time thinking about a thing, you’ll never get it done.",
    "Bruce Lee",
  ],
  [
    "Life is like a box of chocolates. You never know what you’re going to get.",
    "Forrest Gump",
  ],
  ["Not how long, but how well you have lived is the main thing. ", "Seneca"],
  [
    "A happy life consists in the tranquility of mind. ",
    " Marcus Tullius Cicero",
  ],
  [
    "The realization that life is absurd cannot be an end, but only a beginning. ",
    " Albert Camus",
  ],
  [
    "Three things in life – your health, your mission, and the people you love. That’s it.",
    " Naval Ravikant",
  ],
  ["Be happy for this moment. This moment is your life.", " Omar Khayyam"],
  [
    "Two things determine how your life will turn out: luck and the quality of your decisions. ",
    "Annie Duke",
  ],
  [
    "Where you are going to spend your time and your energy is one of the most important decisions you get to make in life. ",
    "Jeff Bezos",
  ],
  [
    "Some people make bad choices, but that doesn’t make them bad people. ",
    "Gary Goodridge",
  ],
  ["My life is my message.", " Mahatma Gandhi"],
  [
    "Difficult and meaningful will always bring more satisfaction than easy and meaningless.",
    " Maxime Lagacé",
  ],
  [
    "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    " Marcus Aurelius",
  ],
  ["Change your thoughts and you change your world.", " Norman Vincent Peale"],
  [
    "Dost thou love life? Then do not squander time, for that is the stuff life is made of.",
    " Benjamin Franklin",
  ],
  [
    "Believe that life is worth living and your belief will help create the fact. ",
    "William James",
  ],
  ["Life is a book you write, not a movie you watch.", " Maxime Lagacé"],
  [
    "A happy, calm, and peaceful person will make better decisions.",
    " Naval Ravikant",
  ],
  ["More is lost by indecision than wrong decision. ", "Cicero"],
  [
    "Stay committed to your decisions, but stay flexible in your approach. ",
    "Tony Robbins",
  ],
  ["Decisions are nothing without execution.", " Shane Parrish"],
  [
    "Most people are either good at thinking with a 10 year time horizon or operating with the urgency of a 10 day time horizon. Extremely powerful if you can do both.",
    "Sam Altman",
  ],
  [
    "The most important thing is to look ahead. The past is your anchor.",
    "Maxime Lagacé",
  ],
  [
    "Victory is in having done your best. If you’ve done your best, you’ve won.",
    "Billy Bowerman",
  ],
  ["Positivity is a superpower.", "Ryan Brewlow"],
  [
    "You are only one defining decision away from a totally different life.",
    "Mark Batterson",
  ],
  ["Once you choose hope, anything’s possible.", "Christopher Reeve"],
  ["Keep looking up… that’s the secret of life.", "Charlie Brown"],
  [
    "One person can make a difference, and everyone should try.",
    "John F. Kennedy",
  ],
  [
    "Mix a little foolishness with your serious plans. It is lovely to be silly at the right moment.",
    "Horace",
  ],
  [
    "Your legacy is being written by yourself. Make the right decisions.",
    "Gary Vaynerchuk",
  ],
  [
    "A real decision is measured by the fact that you’ve taken a new action. If there’s no action, you haven’t truly decided.",
    " Tony Robbins",
  ],
  [
    "At the start of a decision, intuition is unreliable. The patterns you’ve detected in the past might not apply to the present. After you’ve weighed the decision, intuition becomes useful. It adds valuable information that your analysis might have missed.",
    " Adam Grant",
  ],
  ["Time isn’t the main thing. It’s the only thing.", " Miles Davis"],
  ["Never fall in love with your hypothesis.", " Peter Medawar"],
  [
    "It is a capital mistake to theorize before one has data. Insensibly one begins to twist facts to suit theories instead of theories to suit facts.",
    " Arthur Conan Doyle",
  ],
  [
    "A simple question to run your daily decisions through: Will this cost me time in the future or save me time in the future? ",
    "James Clear",
  ],
  [
    "You will never find time for anything. If you want time you must make it.",
    " Charles Buxto",
  ],
  ["Systemize your decision making.", " Ray Dalio "],
  [
    "Raising the probability of being right is valuable no matter what your probability of being right already is.",
    " Ray Dalio",
  ],
  [
    "If you’re good at course correcting, being wrong may be less costly than you think.",
    " Jeff Bezos",
  ],
  ["Enjoy yourself. It’s later than you think.", " Chinese proverb"],
];
let quotes2 = [
  [
    "Think of every decision as a bet with a probability and a reward for being right and a probability and a penalty for being wrong.",
    " Ray Dalio",
  ],
  [
    "The two biggest barriers to good decision making are your ego and your blind spots. Together, they make it difficult for you to objectively see what is true about you and your circumstances and to make the best possible decisions by getting the most out of others.",
    " Ray Dalio",
  ],
  ["Time flies over us, but leaves its shadow behind.", " Nathaniel Hawthorne"],
  ["Every second is of infinite value. ", "Johann Wolfgang von Goethe"],
  [
    "Most people make bad decisions because they are so certain that they’re right. Radically open-minded people know that coming up with the right questions and asking other smart people what they think is as important as having all the answers.",
    " Ray Dalio",
  ],
  [
    "Sincerely believe that you might not know the best possible path and recognize that your ability to deal well with “not knowing” is more important than whatever it is you do know.",
    " Ray Dalio",
  ],
  [
    "It is in your moments of decision that your destiny is shaped.",
    " Tony Robbins",
  ],
  ["The future has a way of arriving unannounced. ", "George F. Will"],
  [
    "Whether it’s the best of times or the worst of times, it’s the only time we’ve got.",
    " Art Buchwald",
  ],
  ["Life, if well lived, is long enough.", " Seneca"],
  [
    "Science is about observables; decisions, risk, life, profits and wisdom are about unobservables.",
    " Nassim Nicholas Taleb",
  ],
  ["The two most powerful warriors are patience and time.", " Leo Tolstoy"],
  [
    "The present time has one advantage over every other – it is our own.",
    " Charles Caleb Colton",
  ],
  [
    "How we spend our days, is, of course, how we spend our lives.",
    " Annie Dillard",
  ],
  [
    "The more you know yourself, the more you understand life, the more you value your time.",
    " Maxime Lagacé",
  ],
  ["Believe you can and you’re halfway there.", " Theodore Roosevelt"],
  [
    "Life can only be understood backwards; but it must be lived forwards",
    ". Søren Kierkegaard",
  ],
  [
    "If you spend too much time thinking about a thing, you’ll never get it done.",
    " Bruce Lee",
  ],
  [
    "Life is like a box of chocolates. You never know what you’re going to get. ",
    "Forrest Gump",
  ],
  ["Not how long, but how well you have lived is the main thing.", " Seneca"],
  [
    "A man who dares to waste one hour of time has not discovered the value of life. ",
    "Charles Darwin",
  ],
  [
    "Your time is limited, so don’t waste it living someone else’s life.",
    " Steve Jobs",
  ],
  [
    "Do we need more time? Or do we need to be more disciplined with the time we have?",
    " Kerry Johnson",
  ],
  [
    "People often complain about lack of time when lack of direction is the real problem. ",
    "Zig Ziglar",
  ],
  ["Guard your time. It’s all you have.", " Naval Ravikant"],
  [
    "Time is the coin of your life. It is the only coin you have, and only you can determine how it will be spent. Be careful lest you let other people spend it for you.",
    " Carl Sandburg",
  ],
  [
    "A happy life consists in the tranquility of mind.",
    " Marcus Tullius Cicero",
  ],
  [
    "The realization that life is absurd cannot be an end, but only a beginning. ",
    "Albert Camus",
  ],
  ["Time is a gift that most of us take for granted.", " Cheryl Richardson"],
  [
    "Your time is your life. That is why the greatest gift you can give someone is your time.",
    " Rich Warren",
  ],
  [
    "Time is more important than your money. It’s more important than your friends. It is more important than anything. Your time is all you have. Do not waste your time.",
    " Naval Ravikant",
  ],
  ["Time is the devourer of everything.", " Ovid"],
  [
    "The only reason for time is so that everything doesn’t happen at once.",
    " Albert Einstein",
  ],
  [
    "Who you think you are each day, completely determines the universe you live in.",
    " Ram Dass",
  ],
  [
    "Everything that has a beginning has an ending. Make your peace with that and all will be well.",
    " Jack Kornfield",
  ],
  [
    "What you really value is what you miss, not what you have.",
    " Jorge Luis Borges",
  ],
  [
    "You know, there are two good things in life, freedom of thought and freedom of action.",
    " Somerset Maugham",
  ],
  [
    "Thinking is easy, acting is difficult, and to put one’s thoughts into action is the most difficult thing in the world.",
    " Johann Wolfgang von Goethe",
  ],
  [
    "The most important thing for learning is doing. The most important thing for success is saying no. The most important thing for happiness is saying yes. ",
    "Maxime Lagacé",
  ],
  [
    "Embrace discomfort. That’s how you’ll learn, grow, become strong, and ultimately, become free.",
    " Maxime Lagacé",
  ],
  ["The greatest effort is not concerned with results.", " Atisha"],
  [
    "Your desire for pleasure or happiness makes you unhappy.",
    " Sri Sri Ravi Shankar",
  ],
  ["One gains by losing and loses by gaining.", " Zen proverb"],
  [
    "No matter how much you try to hold on to something, it will all be gone.",
    " Taoist proverb",
  ],
  [
    "If we are facing in the right direction, all we have to do is keep on walking. ",
    "Buddhist proverb",
  ],
  [
    "Drop the idea of becoming someone, because you are already a masterpiece. You cannot be improved. You have only to come to it, to know it, to realize it.",
    " Osho",
  ],
  [
    "If you look deeply into the palm of your hand, you will see your parents and all generations of your ancestors. All of them are alive in this moment. Each is present in your body. You are the continuation of each of these people.",
    " Thich Nhat Hanh",
  ],
  [
    "Craziness is good. Crazy people are happy, free, they have no hindrance. But since you have many attachment, you are only a little crazy. This is not crazy enough. You must become completely crazy. Then you will understand.",
    " Seungsahn",
  ],
  [
    "Wisdom tells me I am nothing, love tells me I am everything. Between the two, my life flows.",
    " Nisargadatta",
  ],
  [
    "The key to everything: give yourself permission to be who you really are. ",
    "Susan Cain",
  ],
  ["We think too much and feel too little.", " Charlie Chaplin"],
  ["Where does a thought go when it’s forgotten? ", "Sigmund Freud"],
  [
    "He who is untrue to his own cause cannot command the respect of others.",
    " Albert Einstein",
  ],
  [
    "We experience ourselves our thoughts and feelings as something separate from the rest. A kind of optical delusion of consciousness. This delusion is a kind of prison for us, restricting us to our personal desires and to affection for a few persons nearest to us.",
    " Albert Einstein",
  ],
  [
    "Most people are other people. Their thoughts are someone else’s opinions, their lives a mimicry, their passions a quotation.",
    " Oscar Wilde",
  ],
  [
    "Presence is when you’re no longer waiting for the next moment, believing that the next moment will be more fulfilling than this one.",
    " Eckhart Tolle",
  ],
  [
    "As human beings, all 7 billion of us are born the same way and die the same way. Physically, mentally and emotionally we are the same. We all want to live a happy life and avoid problems, but in a materialistic culture we overlook the importance of love and affection.",
    " 14th Dalai Lama",
  ],
  [
    "Man is born free, but everywhere he is in chains.",
    " Jean-Jacques Rousseau",
  ],
  [
    "Be a loner. That gives you time to wonder, to search for the truth. Have holy curiosity. Make your life worth living.",
    " Albert Einstein",
  ],
  ["I cannot teach anybody anything. I can only make them think.", " Socrates"],
  [
    "We have never arrived. We are in a constant state of becoming.",
    " Bob Dylan",
  ],
  [
    "Most people would sooner die than think; in fact, they do so.",
    " Bertrand Russell",
  ],
  ["I never learned anything when I was talking.", " Larry King"],
  ["A clear rejection is always better than a fake promise.", " Zig Ziglar"],
  [
    "In order to understand the world, one has to turn away from it on occasion. ",
    "Albert Camus",
  ],
  ["The only shame is to have none.", " Blaise Pascal"],
  ["Don’t push the river; let the river flow. ", "Arianna Huffington"],
  ["Act without expectation. ", "Lao Tzu"],
  ["Ignorance is bold.", " Thucydides"],
  ["No clinging, no seeking. ", "Zen proverb"],
  ["To think for yourself, question yourself. ", "Maxime Lagacé"],
  ["Direction matters more than speed.", " Shane Parrish"],
  ["Recognize and honor your uniqueness.", " Sri Sri Ravi Shankar"],
  ["You are still guided by your expectations. ", "Chuang Tzu"],
  ["A meditator is both an artist and a warrior. ", "Thich Nhat Hanh"],
  ["Some lose yet gain, others gain and yet lose.", " Lao Tzu"],
  ["There is no quick pathway from smart to wise. ", "Jordan Peterson"],
  ["Those who stand for nothing fall for anything.", " Alexander Hamilton"],
  ["Talking is overrated. Listening is underrated. ", "Maxime Lagacé"],
  ["To find yourself, think for yourself. ", "Socrates"],
  ["Remember: eventually, no one will remember you.", " Jack Butcher"],
  ["Where all think alike, no one thinks very much.", " Walter Lippmann"],
  ["You always admire what you really don’t understand.", " Blaise Pascal"],
  ["The really important thing is not to reject anything.", " Susan Sontag"],
  [
    "A thought, even a possibility, can shatter and transform us.",
    " Friedrich Nietzsche",
  ],
  [
    "If you want to cure the world, don’t emanate fear – emanate love.",
    " Ram Dass",
  ],
  [
    "The fool has many thoughts, dramatize them and becomes agitated. The wise has many thoughts, ignore most of them and stay cool-headed.",
    " Maxime Lagacé",
  ],
  [
    "A man is literally what he thinks, his character being the complete sum of all his thoughts.",
    " James Allen",
  ],
  [
    "Look at the moon. It travels in the sky completely free, and this freedom produces beauty and happiness.",
    " Thich Nhat Hanh",
  ],
  [
    "The most important things in life are so simple: be good to people, cherish your friends and family, do what makes you happy, be present.",
    " Jack Altman",
  ],
  [
    "The present moment. It’s where high performance is expressed and wisdom is revealed.",
    " Michael Gervais",
  ],
  [
    "The power is in you. The answer is in you. And you are the answer to all your searches: you are the goal. You are the answer. It’s never outside.",
    " Eckhart Tolle",
  ],
  [
    "Everything in your life is there as a vehicle for your transformation. Use it. ",
    "Ram Dass",
  ],
  [
    "Life’s meaning is not in following someone else, it is in the unfolding of one’s own self. It is not a process of becoming like someone else, it is to be oneself. ",
    "Osho",
  ],
  [
    "Most people feel that they become more and more authentic over the course of their lives. I think that the older we get, the less we give a damn who we’re “supposed” to be.",
    " Susan Cain",
  ],
  [
    "Go back and take care of yourself. Your body needs you, your feelings need you, your perceptions need you.",
    " Thich Nhat Hanh",
  ],
  [
    "Our practice is to cultivate good seeds in the soil of our mind, knowing that they will mature and bloom in their own time.",
    " Thich Nhat Hanh",
  ],
  ["Our quality of being determines our quality of doing.", " Thich Nhat Hanh"],
  [
    "There are years that ask questions, and years that answer.",
    " Zora Neale Hurston",
  ],
  ["Our deepest nature is to awaken and flower.", " Tara Brach"],
  [
    "People say nothing is impossible, but I do nothing every day.",
    " Winnie the Pooh (A. A. Milne)",
  ],
  ["To err is human; to admit it, superhuman.", " Doug Larson"],
  [
    "If you want your children to listen, try talking softly to someone else.",
    " Ann Landers",
  ],
  [
    "I have a lot of growing up to do. I realized that the other day inside my fort. ",
    "Zach Galifianakis",
  ],
  [
    "Men marry women with the hope they will never change. Women marry men with the hope they will change. Invariably they are both disappointed. ",
    "Albert Einstein",
  ],
  [
    "As you get older, three things happen. The first is your memory goes, and I can’t remember the other two.",
    " Sir Norman Wisdom",
  ],
  [
    "“That’s funny” is a nice way of letting someone know it really wasn’t. ",
    "Sammy Rhodes",
  ],
  [
    "How many people here have telekenetic powers? Raise my hand.",
    " Emo Philips",
  ],
  [
    "I refuse to join any club that would have me as a member.",
    " Groucho Marx",
  ],
  [
    "Fools laugh at others. The wise laugh with others. The wisest laugh at themselves.",
    " Maxime Lagacé",
  ],
  [
    "Always and never are two words you should always remember never to use.",
    " Wendell Johnson",
  ],
  [
    "The public have an insatiable curiosity to know everything, except what is worth knowing.",
    " Oscar Wilde",
  ],
  [
    "Clothes make the man. Naked people have little or no influence in society. ",
    "Mark Twain",
  ],
  ["Go to Heaven for the climate, Hell for the company.", " Mark Twain"],
  ["A day without sunshine is like, you know, night.", " Steve Martin"],
  [
    "Comfort is no test of truth. Truth is often far from being comfortable.",
    " Swami Vivekananda",
  ],
  [
    "It’s okay to be alone, to be sad, to rest and repair. Really.",
    " Susan Cain",
  ],
  [
    "If only humanity made its loving as frequent and as detailed as its complaining.",
    " Philip Arnold",
  ],
  [
    "Brief is man’s life and small the nook of the Earth where he lives; brief, too, is the longest posthumous fame, buoyed only by a succession of poor human beings who will very soon die and who know little of themselves, much less of someone who died long ago.",
    " Marcus Aurelius",
  ],
  [
    "No one can see their reflection in running water. It is only in still water that we can see.",
    " Lao Tzu",
  ],
  [
    "Little things console us because little things afflict us.",
    " Blaise Pascal",
  ],
  [
    "There are only two kinds of men: the righteous who think they are sinners and the sinners who think they are righteous.",
    " Blaise Pascal",
  ],
  [
    "Abundance is harder for us to handle than scarcity. ",
    "Nassim Nicholas Taleb",
  ],
  [
    "If you don’t crave for joy, misery won’t touch you. If you don’t crave for peace, nothing will disturb you.",
    " Sri Sri Ravi Shankar",
  ],
  [
    "What makes you ‘you’? If you find this out, your life becomes an eternal celebration. ",
    "Sri Sri Ravi Shankar",
  ],
  [
    "Nothing in the world can bother you as much as your own mind, I tell you. In fact, others seem to be bothering you, but it is not other, it is your own mind.",
    " Sri Sri Ravi Shankar",
  ],
  [
    "We are prisoners of the present, in perpetual transition from an inaccessible past to an unknowable future.",
    " Neil deGrasse Tyson",
  ],
  [
    "If you look for truth, you may find comfort in the end: if you look for comfort you will not get either comfort or truth – only soft soap and wishful thinking to begin with and, in the end, despair. ",
    "C.S. Lewis",
  ],
  [
    "To be nobody but yourself in a world which is doing its best day and night to make you like everybody else means to fight the hardest battle which any human being can fight and never stop fighting.",
    " E.E. Cummings",
  ],
  [
    "In a society that profits from your self-doubt, liking yourself is a rebellious act. ",
    "Caroline Caldwell",
  ],
  [
    "Your perspective on life comes from the cage you were held captive in. ",
    "Shannon L. Alder",
  ],
  [
    "The more you meditate, the more you understand yourself, the more peaceful you can be. ",
    "Maxime Lagacé",
  ],
  [
    "What you are aware of, you are in control of; what you are not aware of, is in control of you.",
    " Anthony de Mello",
  ],
  [
    "The foolish reject what they see, not what they think; the wise reject what they think, not what they see.",
    " Huang Po",
  ],
  [
    "The fools have busy minds and busy calendars. The wise have quiet minds and quiet calendars. The wiser have fulfilled minds and no calendar.",
    " Maxime Lagacé",
  ],
  [
    "Conquer the angry man by love. Conquer the ill-natured man by goodness. Conquer the liar with truth.",
    " The Dhammapada",
  ],
  [
    "He who tries to shine dims his own light. He who defines himself can’t know who he really is.",
    " Lao Tzu ",
  ],
  [
    "Three treasures I cherish: The first is fathomless love, the second is frugality, and the third is reluctance to lead. ",
    "Lao Tzu",
  ],
  [
    "When people do not ignore what they should ignore, but ignore what they should not ignore, this is ignorance. ",
    "Zhuangzi",
  ],
  ["The way of the sage is to act but not to compete. ", "Lao Tzu"],
  [
    "The future is being made out of the present, so the best way to take care of the future is to take care of the present moment. This is logical and clear.",
    " Thich Nhat Hanh",
  ],
  [
    "If you miss the present moment, you miss your appointment with life.",
    " Thich Nhat Hanh",
  ],
  [
    "There is the mud, and there is the lotus that grows out of the mud. We need the mud in order to make the lotus.",
    " Thich Nhat Hanh",
  ],
  [
    "If you follow wisdom, fun follows you. If you follow fun, misery follows you.",
    " Sri Sri Ravi Shankar",
  ],
  [
    "Never assume it’s too late, but remember you don’t have forever.",
    " Johnny Uzan",
  ],
  ["Darkness is an absence of light. Ego is an absence of awareness.", " Osho"],
  [
    "The power of man’s virtue should not be measured by his special efforts, but by his ordinary doings.",
    " Blaise Pascal",
  ],
  [
    "A man who is never foolish is not as wise as he thinks.",
    " François de La Rochefoucauld",
  ],
  ["Foolishness is a twin sister of wisdom.", " Witold Gombrowicz"],
  [
    "There is only a finger’s difference between a wise man and a fool.",
    " Diogenes",
  ],
  ["Never say no twice if you mean it. ", "Nassim Nicholas Taleb"],
  [
    "Irrigators channel waters; fletchers straighten arrows; carpenters bend wood; the wise master themselves. ",
    "Buddha",
  ],
  [
    "Wisdom is nothing but a preparation of the soul, a capacity, a secret art of thinking, feeling and breathing thoughts of unity at every moment of life.",
    " Hermann Hesse",
  ],
  [
    "A lot of wisdom is just realizing the long-term consequences of your actions. The longer term you’re willing to look, the wiser you’re going to seem to everybody around you.",
    " Naval Ravikant",
  ],
  ["Everything comes in time to him who knows how to wait. ", "Leo Tolstoy"],
  ["Logic is the beginning of wisdom, not the end.", " Leonard Nimoy"],
  ["Knowledge speaks, but wisdom listens. ", "Jimi Hendrix"],
  ["Silence is the sleep that nourishes wisdom. ", "Francis Bacon"],
  [
    "A weak reaction is to rush things. A strong reaction is to go slow and steady. ",
    "Maxime Lagacé",
  ],
  ["The best words are the ones you are ready for. ", "Maxime Lagacé"],
  [
    "We don’t receive wisdom; we must discover it for ourselves after a journey that no one can take for us or spare us. ",
    "Marcel Proust",
  ],
  [
    "Keep me away from the wisdom which does not cry, the philosophy which does not laugh and the greatness which does not bow before children.",
    " Kahlil Gibran",
  ],
  [
    "A man has made at least a start on discovering the meaning of human life when he plants shade trees under which he knows full well he will never sit.",
    " David Elton Trueblood",
  ],
  [
    "The wise know they are fools. Fools think they are wise.",
    " Maxime Lagacé",
  ],
];
exports.default = quotes;
