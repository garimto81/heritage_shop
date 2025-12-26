
import { TierLevel, VIPMember, Product } from './types';

export const MOCK_VIPS: VIPMember[] = [
  {
    id: '1',
    name: 'Eleanor Pena',
    email: 'eleanor.pena@example.com',
    tier: TierLevel.GOLD,
    inductionDate: '24 OCT 23',
    status: 'ACTIVE',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAApzTlkCoNV5uB27XcsNCPNbpgJDiYFbknuvJpeh_gGY9MnsTFZZWtNgo1ZpnqJPGDCiT2bCdGAi73tZjT9GcURZxmaamM_U4H9R9IOueBwAqOPBPdugFWziZOiQvWY8bTLNf2YT-QD_VGpYF2O9WAYhUnq1ZwQ0b402kPJHYx3JaPYL2cJir7MKj1Mloi_nhghVrW7oYu-SmFgZLGtJVPDRziTxtFyBLVoEZRNXARYyAnkOYXWzd-bPxhmCevsiHyFmLtJOqwF_BL'
  },
  {
    id: '2',
    name: 'Wade Warren',
    email: 'wade.warren@example.com',
    tier: TierLevel.SILVER,
    inductionDate: '22 OCT 23',
    status: 'ACTIVE',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6zctu6wbjYz9b8pvQNxp_53C_5ECCHMBRZLPhdXCAzTb8TWFJ-LeRXyPxkBS0TZx_AD82hysm2mnBhbspFAJpoRnBfEHA9FZdGq-J1u45WBznhD9msv_h_2J6eR4AJ-9ChS5OjaVz_N6fr8oslZSDXU7fvmAMalVLbsHuRn75sknoXJlxmOFtUvGnEF1SQnHZlyDSDEtg1TlwXtLjJofmjeOXlO63Besn_sBZ0MJ1L5dFOJh9aeHPOFmfTJSBNS3xh9OdM6IPa24u'
  },
  {
    id: '3',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    tier: TierLevel.GOLD,
    inductionDate: '20 OCT 23',
    status: 'ACTIVE'
  },
  {
    id: '4',
    name: 'Robert Fox',
    email: 'robert.fox@example.com',
    tier: TierLevel.SILVER,
    inductionDate: '19 OCT 23',
    status: 'ACTIVE',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn8TpBZ-jBDz74XReAQ7hx6uuF8wvdP3qROE4TNYRjtEweg3g6z-I_x4V1S3keN8LTw0LkR9oBxZ5l-I7FRJF5ZsD5UJixIRRAlHTwwOqcOW4AufOGXqmVz3gvlGDpKLcj9m-u63k-jKtnOPruhHMvevRnjf_rx1XPMwtoZ_vRFQn6tsyIFuudaNlYjEfZGwDyrZpCFIeNdMK-6_dqJnH66hVh5XKV9_jaO7H5ULsxI3MRqgzZUPV03U4m2Q1nsCCAyItCDRXfSUw2'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'obsidian-tote',
    name: 'The Obsidian Tote',
    category: 'Leather Goods',
    tierRequirement: TierLevel.PLATINUM,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUIBRb7j8LwqkuSIoALX1qDROMNZizza695F_nr6pt_ivzEK7KtKiAF-rW0kATlQzbUSBg_F9uT23z-zmcuEwggQPfrS6tyGcLtxhvBhwaf6JKuJCRArtnaZxB6hSCeAvmYFENc_tYVPaJtH2eiJ3-_vPcKUHH2x_WK6tSj4EsP2b6q0ZcUNWTiaxSxYpFPwd2ehs4nQhPCqphuT89HiOS13CSBjsiByDC1br27LgAjHWqueectTUVlagU-mrG8u1-rvc8gIAhO0I2',
    description: 'Meticulously crafted from Italian full-grain calfskin, The Obsidian Tote represents the pinnacle of our Winter collection.',
    isAvailable: true,
    refCode: '24-W-OB01'
  },
  {
    id: 'noir-oud',
    name: 'Noir Oud Cologne',
    category: 'Fragrance',
    tierRequirement: TierLevel.GOLD,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALmrnACQzp7HRK6XaOXzGeCO9Xx9ph4aULfFrjnJvNcuYgCZwXP4U4kH2JSN4zIeP_lrK8xhno9cXNMp3ndyO-2k4kgTr1lyL69X596v-exIxpVW-swdhsJb_GMcufxIMtfkersw5bAxw4qJDf8hgJbqr8tv9AcdKT88_girMIDt0_-Jprw_AUNY9niv99-kKaFeqVynFmBh15YAxgeQ8vtXbRdUTmrYkmsf0bHlSG1FVvrrPeHFqEuLNeRt9cqZf1ouJOXR6n8eHA',
    description: 'A deep, mysterious blend of rare oud wood and dark spices.',
    isAvailable: true,
    refCode: 'FG-NO-01'
  },
  {
    id: 'chrono-gt',
    name: 'Chronograph GT',
    category: 'Timepieces',
    tierRequirement: TierLevel.GOLD,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn-SClkbIbegPauvIGEnF3GpbkUNJ0tf3l6siUOg-xD-pEL6LETBi8LQV_HqaVS_JwIb9uThds4J9DatDDQSWnW9sz2k-HxNAE-5zOWYAVcsMa103GtFYqeNmzCjKcfzpcPvQBq3wEpng9S3pBj-EHzOdue5dJfNuaaz8D-kz9Jo_kKtgATkS5GgP6pPv2jPtA-2MYbUgoMoMRvsqI2NjJrPLI8NGwhnwcNKQ2XVZ1G0p99VV_WFQlvwIznb5ETPgp2a-QZ8-Y4AXJ',
    description: 'Precision engineering meets timeless design in this limited edition timepiece.',
    isAvailable: true,
    refCode: 'TM-GT-77'
  }
];
