export const profile = {
  name: '吴明康',
  englishName: 'Wu Mingkang',
  title: '嵌入式工程师',
  email: '1656280667@qq.com',
  phone: '13372103279',
  birth: '2004.05',
  avatar: '/avatar.svg',
  wechat: 'Mingkang_Wu',

  stats: {
    projects: 6,
    awards: 4,
    patents: 1,
    experience: '2+'
  },

  education: {
    school: '南京工程学院',
    major: '自动化',
    degree: '本科',
    period: '2022.07 - 2026.06',
    courses: ['电路原理', '模拟电子技术', '数字电子技术', '自动控制原理', '电力电子技术', '电机与拖动基础', '电气控制与PLC', '运动控制系统', '计算机集成制造系统']
  },

  bio: '熟悉STM32各系列开发，能使用标准库与HAL库完成下位机程序编写，接触过FreeRTOS实时操作系统与常见传感器、电机驱动等外设调试。参与过多次国家级、省级机器人竞赛的下位机开发工作，对嵌入式系统的软硬件联调有一定实践经验，具备基本的代码调试与问题排查能力。工作态度踏实，愿意从具体任务做起，仍在持续学习以提升技术水平。',

  experiences: [
    {
      company: '昆山市禾物数字科技有限公司',
      position: '技术助理（实习）',
      period: '2025.07 - 2025.08',
      location: '昆山',
      salary: '3000元/月',
      details: [
        '毕设文档编写与排版：根据客户提供的项目资料，协助完成毕业设计论文的格式排版、图表优化及参考文献整理，累计服务客户15+',
        'PCB焊接与接线：使用嘉立创EDA查看PCB设计文件，完成元器件手工焊接及飞线连接，配合进行电路通断测试和故障排查',
        '售前售后支持：通过微信/电话对接客户，解答毕设文档修改、电路板使用等基础问题，记录并跟进售后工单',
        '电路原理图校对：协助核对原理图与PCB layout的一致性，检查封装匹配性及网络连接'
      ]
    },
    {
      company: '张家港市创为自动化工程有限公司',
      position: '自动化助理工程师（实习）',
      period: '2025.03',
      location: '张家港',
      salary: '4500元/月',
      details: [
        'PLC程序辅助调试：协助完成西门子S7-1200系列PLC程序下载与在线监控，参与自动配料系统控制逻辑现场调试',
        '电气图纸整理归档：使用AutoCAD整理项目电气原理图及接线图，完成3个非标自动化设备项目图纸标准化归档',
        '元器件选型与采购协助：根据BOM清单筛选变频器、接近开关、继电器等电气元件供应商，整理采购比对表',
        '现场安装支持：跟随工程师前往客户工厂，参与电气控制柜现场安装与布线，协助设备上电前线路检测',
        '技术文档编写：编写设备操作说明书及维护手册，整理调试日志和故障处理记录'
      ]
    }
  ],

  projects: [
    {
      title: '双臂魔方机器人',
      subtitle: '毕业设计',
      image: '/project1.svg',
      tags: ['树莓派Pico', '树莓派', 'TMC2209', '步进电机驱动', 'OpenCV'],
      description: '下位机采用树莓派Pico，通过TMC2209步进电机驱动控制双臂运动；上位机采用树莓派，利用OpenCV识别魔方六个面所有色块，求解还原算法并与下位机通信完成魔方还原。'
    }
  ],

  awards: [
    {
      name: '2023 中国机器人大赛暨RoboCup机器人世界杯中国赛 全国赛',
      level: '二等奖',
      role: '负责下位机 — STM32F1 HAL库，实现车辆精准位置控制'
    },
    {
      name: '2023 中国机器人大赛暨RoboCup机器人世界杯中国赛 专项赛',
      level: '三等奖',
      role: '负责下位机 — STM32C8T6 标准库，实现车辆精准位置控制'
    },
    {
      name: '2023 江苏省大学生工程实践与创新能力大赛',
      level: '二等奖',
      role: '负责下位机 — STM32F4 HAL库 + WIT陀螺仪，实现车辆位置控制、机械臂控制、物块识别'
    },
    {
      name: 'RoboMaster 2024 机甲大师高校联盟赛（山东站）步兵对抗赛',
      level: '三等奖',
      role: '负责下位机 — C板 HAL库 + FreeRTOS + M2006无刷电机，车辆遥控与炮口射击'
    }
  ],

  patents: [
    {
      name: '一种舵轮全地形底盘',
      type: '实用新型专利'
    }
  ],

  skills: [
    {
      category: 'MCU开发',
      icon: 'chip',
      items: ['STM32全系列', '树莓派Pico', '标准库 & HAL库', 'FreeRTOS']
    },
    {
      category: '硬件设计',
      icon: 'pcb',
      items: ['嘉立创EDA', 'PCB焊接与调试', '电路原理图校对', '飞线连接与排故']
    },
    {
      category: '编程语言',
      icon: 'code',
      items: ['C / C++', 'Python', 'Lua']
    },
    {
      category: '通信与电机',
      icon: 'motor',
      items: ['UART / I2C / SPI', 'PWM', '步进电机驱动', 'M2006无刷电机']
    },
    {
      category: 'PLC与电气',
      icon: 'plc',
      items: ['西门子S7-1200', 'AutoCAD电气图', '变频器与继电器', '电气控制柜布线']
    },
    {
      category: '工具与平台',
      icon: 'tools',
      items: ['Git', 'Altium Designer', 'SolidWorks基础', 'Linux基础']
    }
  ],

  social: {
    email: '1656280667@qq.com',
    phone: '13372103279',
    github: '#',
    wechat: 'Mingkang_Wu'
  }
}
