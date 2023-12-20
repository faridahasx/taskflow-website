"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let quotes = [
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
