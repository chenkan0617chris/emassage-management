export const mockMasseurs = [
  {
    id: "1",
    fullName: "王小云",
    profilePhoto: "https://i.pravatar.cc/150?img=1",
    yearsOfExperience: 5,
    certifications: ["中医按摩师证", "推拿师证"],
    specialties: ["传统推拿", "足部按摩", "肩颈按摩"],
    rating: 4.8,
    reviewCount: 128,
    availability: "2024-03-22 14:30",
    status: "active"
  },
  {
    id: "2",
    fullName: "李明康",
    profilePhoto: "https://i.pravatar.cc/150?img=2",
    yearsOfExperience: 8,
    certifications: ["高级按摩师证", "康复理疗师证"],
    specialties: ["运动康复", "精油按摩", "全身按摩"],
    rating: 4.9,
    reviewCount: 256,
    availability: "2024-03-22 16:00",
    status: "active"
  },
  {
    id: "3",
    fullName: "张雨婷",
    profilePhoto: "https://i.pravatar.cc/150?img=3",
    yearsOfExperience: 3,
    certifications: ["中级按摩师证"],
    specialties: ["精油按摩", "头部按摩"],
    rating: 4.6,
    reviewCount: 89,
    availability: "2024-03-23 09:00",
    status: "active"
  },
  // ... 更多模拟数据
]

export const searchFields = [
  { label: "姓名", value: "fullName" },
  { label: "专长", value: "specialties" },
  { label: "证书", value: "certifications" },
]

export const specialtyOptions = [
  { label: "全部专长", value: "all" },
  { label: "传统推拿", value: "traditional" },
  { label: "精油按摩", value: "oil" },
  { label: "足部按摩", value: "foot" },
  { label: "运动康复", value: "sports" },
  { label: "肩颈按摩", value: "shoulder" },
]

export const experienceRanges = [
  { label: "所有经验", value: "all" },
  { label: "1-3年", value: "1-3" },
  { label: "3-5年", value: "3-5" },
  { label: "5年以上", value: "5+" },
] 