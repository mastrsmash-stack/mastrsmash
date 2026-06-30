import classicSmashImg from './assets/classic_smash.png';
import cheeseSmashImg from './assets/cheese_smash.png';
import loadedFriesImg from './assets/loaded_fries.png';
import drinksImg from './assets/drinks.png';

export interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  description: string;
  price: number; // For non-burgers, or base price
  prices?: {
    single: number;
    double: number;
  }; // For burgers that have single/double prices
  image: string;
  hasSizes: boolean;
  popular?: boolean;
  rating: number; // e.g. 4.9
  reviewsCount: number; // e.g. 142
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // Used to determine icon from lucide-react
  items: MenuItem[];
}

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
}

export const EXTRA_ITEMS: ExtraItem[] = [
  { id: 'extra_cheese_sauce', name: 'اكسترا شيدر صوص', price: 10 },
  { id: 'extra_meat_patty', name: 'شريحة لحم', price: 7 },
  { id: 'extra_sauce', name: 'صوص إضافي', price: 3 },
  { id: 'extra_ketchup', name: 'كاتشب', price: 2 },
  { id: 'extra_egg', name: 'بيض', price: 2 },
  { id: 'extra_cheese_slice', name: 'جبن', price: 1 },
];

export const menuCategories: Category[] = [
  {
    id: 'burgers',
    name: 'البرجر',
    iconName: 'Flame',
    items: [
      {
        id: 'classic-smash',
        name: 'كلاسيك سماش',
        englishName: 'Classic Smash',
        description: 'خبز بريوش طازج، صوص سماش السري، سلطة، شريحة لحم بلدي، جبنة شيدر أمريكية ذائبة، وبصل مكرمل.',
        price: 14,
        prices: {
          single: 14,
          double: 20
        },
        image: classicSmashImg,
        hasSizes: true,
        popular: true,
        rating: 4.9,
        reviewsCount: 248
      },
      {
        id: 'spicy-smash',
        name: 'سبايسي سماش',
        englishName: 'Spicy Smash',
        description: 'خبز بريوش، صوص حار ناري، سلطة، شريحة لحم، جبنة شيدر، بصل مكرمل، وقطع هالبينو حارة.',
        price: 15,
        prices: {
          single: 15,
          double: 20
        },
        image: classicSmashImg,
        hasSizes: true,
        rating: 4.8,
        reviewsCount: 185
      },
      {
        id: 'cheese-smash',
        name: 'تشيز سماش',
        englishName: 'Cheese Smash',
        description: 'خبز بريوش، صوص سماش، شريحة لحم، جبن، بصل مكرمل، غارقة بالكامل بصوص جبن الشيدر الغني.',
        price: 20,
        prices: {
          single: 20,
          double: 27
        },
        image: cheeseSmashImg,
        hasSizes: true,
        popular: true,
        rating: 4.9,
        reviewsCount: 312
      },
      {
        id: 'original-smash',
        name: 'اوريجنال سماش',
        englishName: 'Original Smash',
        description: 'خبز بريوش، صوص ماستر، سلطة طازجة، شريحة لحم، جبنة شيدر، وبيض مقلي مثالي.',
        price: 15,
        prices: {
          single: 15,
          double: 22
        },
        image: classicSmashImg,
        hasSizes: true,
        rating: 4.7,
        reviewsCount: 124
      },
      {
        id: 'mushroom-burger',
        name: 'ماشروم برجر',
        englishName: 'Mushroom Burger',
        description: 'خبز بريوش، صوص المايونيز بالثوم، سلطة، شريحة لحم، جبنة شيدر، وماشروم طازج سوتيه.',
        price: 17,
        prices: {
          single: 17,
          double: 22
        },
        image: classicSmashImg,
        hasSizes: true,
        rating: 4.8,
        reviewsCount: 156
      },
      {
        id: 'chicken-crispy',
        name: 'تشيكن كريسبي',
        englishName: 'Chicken Crispy',
        description: 'خبز بريوش، صوص ماستر الخاص، سلطة، صدر دجاج كريسبي مقرمش ومتبل، وكاتشب.',
        price: 14,
        image: classicSmashImg, 
        hasSizes: false,
        rating: 4.6,
        reviewsCount: 98
      }
    ]
  },
  {
    id: 'sides',
    name: 'البطاطا والمقبلات',
    iconName: 'Salad',
    items: [
      {
        id: 'meat-fries',
        name: 'فرايز لحم',
        englishName: 'Beef Loaded Fries',
        description: 'بطاطس مقلية ذهبية مقرمشة مغطاة باللحم المفروم المتبل، صوص الشيدر الذائب، وصوص ماستر الخاص.',
        price: 20,
        image: loadedFriesImg,
        hasSizes: false,
        popular: true,
        rating: 4.9,
        reviewsCount: 194
      },
      {
        id: 'regular-fries',
        name: 'بطاطا',
        englishName: 'French Fries',
        description: 'أصابع البطاطس المقلية الذهبية المقرمشة مع تتبيلة البهارات الخاصة بـ ماستر سماش.',
        price: 10,
        image: loadedFriesImg,
        hasSizes: false,
        rating: 4.5,
        reviewsCount: 112
      }
    ]
  },
  {
    id: 'extras',
    name: 'الإضافات',
    iconName: 'PlusCircle',
    items: [
      {
        id: 'extra-cheese-sauce',
        name: 'اكسترا شيدر صوص',
        englishName: 'Extra Cheddar Sauce',
        description: 'صوص جبن الشيدر الكريمي والدافئ.',
        price: 10,
        image: '',
        hasSizes: false,
        rating: 4.8,
        reviewsCount: 84
      },
      {
        id: 'extra-patty',
        name: 'شريحة لحم',
        englishName: 'Extra Meat Patty',
        description: 'شريحة لحم برجر مشوية إضافية للوجبة.',
        price: 7,
        image: '',
        hasSizes: false,
        rating: 4.9,
        reviewsCount: 76
      },
      {
        id: 'extra-sauce',
        name: 'صوص',
        englishName: 'Extra Sauce',
        description: 'صوص ماستر سماش السري الإضافي.',
        price: 3,
        image: '',
        hasSizes: false,
        rating: 4.7,
        reviewsCount: 54
      },
      {
        id: 'extra-ketchup',
        name: 'كاتشب',
        englishName: 'Ketchup',
        description: 'أكياس كاتشب إضافية.',
        price: 2,
        image: '',
        hasSizes: false,
        rating: 4.2,
        reviewsCount: 32
      },
      {
        id: 'extra-egg',
        name: 'بيض',
        englishName: 'Extra Fried Egg',
        description: 'بيضة مقلية إضافية.',
        price: 2,
        image: '',
        hasSizes: false,
        rating: 4.6,
        reviewsCount: 41
      },
      {
        id: 'extra-cheese-slice',
        name: 'جبن',
        englishName: 'Extra Cheese Slice',
        description: 'شريحة جبنة شيدر أمريكية إضافية.',
        price: 1,
        image: '',
        hasSizes: false,
        rating: 4.8,
        reviewsCount: 63
      }
    ]
  },
  {
    id: 'drinks',
    name: 'المشروبات',
    iconName: 'CupSoda',
    items: [
      {
        id: 'soda-drink',
        name: 'مشروب غازي',
        englishName: 'Soft Drink',
        description: 'عبوة مشروب غازي بارد ومنعش (كوكاكولا، سبرايت، فانتا).',
        price: 3,
        image: drinksImg,
        hasSizes: false,
        rating: 4.6,
        reviewsCount: 110
      },
      {
        id: 'water',
        name: 'مياه معدنية',
        englishName: 'Mineral Water',
        description: 'زجاجة مياه معدنية طبيعية مبردة.',
        price: 1,
        image: drinksImg,
        hasSizes: false,
        rating: 4.8,
        reviewsCount: 89
      }
    ]
  }
];
