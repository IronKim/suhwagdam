const data = [
    {
        seq: 1,
        user_seq: 1010,
        title: '무화과는 맛있지만 벌의 무덤이라고 합니다 우헤우헤우하하호호 안냐세연',
        description: '어쩌구저쩌구 무화과를 팔건데 맛있고 신선한 무화과입니다',
        image: `https://cdn.thefairnews.co.kr/news/photo/202311/18342_46615_5231.jpg`,
        starting_price: '15000d',
        current_bid_price: '20000',
        deadLine: '2024-06-14T20:30:00',
    },
    {
        seq: 2,
        user_seq: 1017,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T21:30:00',
    },
    {
        seq: 3,
        user_seq: 1015,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T23:59:00',
    },
    {
        seq: 4,
        user_seq: 1114,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T03:30:00',
    },
    {
        seq: 5,
        user_seq: 1267,
        title: '무화과는 맛있지만 벌의 무덤이라고 합니다 우헤우헤우하하호호 안냐세연',
        description: '어쩌구저쩌구 무화과를 팔건데 맛있고 신선한 무화과입니다',
        image: `https://cdn.thefairnews.co.kr/news/photo/202311/18342_46615_5231.jpg`,
        starting_price: '15000d',
        current_bid_price: '20000',
        deadLine: '2024-06-14T20:30:00',
    },
    {
        seq: 6,
        user_seq: 1211,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-14T19:50:00',
    },
    {
        seq: 7,
        user_seq: 1135,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-18T23:12:00',
    },
    {
        seq: 8,
        user_seq: 1579,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T22:30:00',
    },
    {
        seq: 9,
        user_seq: 1645,
        title: '무화과는 맛있지만 벌의 무덤이라고 합니다 우헤우헤우하하호호 안냐세연',
        description: '어쩌구저쩌구 무화과를 팔건데 맛있고 신선한 무화과입니다',
        image: `https://cdn.thefairnews.co.kr/news/photo/202311/18342_46615_5231.jpg`,
        starting_price: '15000d',
        current_bid_price: '20000',
        deadLine: '2024-06-20T10:30:00',
    },
    {
        seq: 10,
        user_seq: 1345,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-15T07:30:00',
    },
    {
        seq: 11,
        user_seq: 1234,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T13:59:00',
    },
    {
        seq: 12,
        user_seq: 1446,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T01:30:00',
    },
    {
        seq: 13,
        user_seq: 1366,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-14T23:40:00',
    },
    {
        seq: 14,
        user_seq: 1255,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T11:30:00',
    },
    {
        seq: 15,
        user_seq: 1711,
        title: '무화과는 맛있지만 벌의 무덤이라고 합니다 우헤우헤우하하호호 안냐세연',
        description: '어쩌구저쩌구 무화과를 팔건데 맛있고 신선한 무화과입니다',
        image: `https://cdn.thefairnews.co.kr/news/photo/202311/18342_46615_5231.jpg`,
        starting_price: '15000d',
        current_bid_price: '20000',
        deadLine: '2024-06-14T09:30:00',
    },
    {
        seq: 16,
        user_seq: 1817,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T21:40:00',
    },
    {
        seq: 17,
        user_seq: 1315,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-1T03:59:00',
    },
    {
        seq: 18,
        user_seq: 1614,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T03:30:00',
    },
    {
        seq: 19,
        user_seq: 1315,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-19T15:59:00',
    },
    {
        seq: 20,
        user_seq: 1444,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T12:30:00',
    },
    {
        seq: 21,
        user_seq: 1555,
        title: '무화과는 맛있지만 벌의 무덤이라고 합니다 우헤우헤우하하호호 안냐세연',
        description: '어쩌구저쩌구 무화과를 팔건데 맛있고 신선한 무화과입니다',
        image: `https://cdn.thefairnews.co.kr/news/photo/202311/18342_46615_5231.jpg`,
        starting_price: '15000d',
        current_bid_price: '20000',
        deadLine: '2024-06-14T16:22:00',
    },
    {
        seq: 22,
        user_seq: 1887,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-15T22:30:00',
    },
    {
        seq: 23,
        user_seq: 1799,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T23:08:00',
    },
    {
        seq: 24,
        user_seq: 1399,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T15:30:00',
    },
    {
        seq: 25,
        user_seq: 1347,
        title: '무화과는 맛있지만 벌의 무덤이라고 합니다 우헤우헤우하하호호 안냐세연',
        description: '어쩌구저쩌구 무화과를 팔건데 맛있고 신선한 무화과입니다',
        image: `https://cdn.thefairnews.co.kr/news/photo/202311/18342_46615_5231.jpg`,
        starting_price: '15000d',
        current_bid_price: '20000',
        deadLine: '2024-06-21T08:30:00',
    },
    {
        seq: 26,
        user_seq: 1367,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-15T00:30:00',
    },
    {
        seq: 27,
        user_seq: 1788,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-14T21:59:00',
    },
    {
        seq: 28,
        user_seq: 1464,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T16:30:00',
    },
     {
        seq: 29,
        user_seq: 1799,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-14T23:59:00',
    },
    {
        seq: 30,
        user_seq: 1399,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T20:30:00',
    },
    {
        seq: 31,
        user_seq: 1347,
        title: '무화과는 맛있지만 벌의 무덤이라고 합니다 우헤우헤우하하호호 안냐세연',
        description: '어쩌구저쩌구 무화과를 팔건데 맛있고 신선한 무화과입니다',
        image: `https://cdn.thefairnews.co.kr/news/photo/202311/18342_46615_5231.jpg`,
        starting_price: '15000d',
        current_bid_price: '20000',
        deadLine: '2024-06-16T08:30:00',
    },
    {
        seq: 32,
        user_seq: 1367,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-15T00:30:00',
    },
    {
        seq: 33,
        user_seq: 1788,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-14T21:12:00',
    },

    {
        seq: 34,
        user_seq: 1464,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T19:30:00',
    },
         {
        seq: 35,
        user_seq: 1799,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-14T23:59:00',
    },
    {
        seq: 36,
        user_seq: 1399,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T18:35:00',
    },
    {
        seq: 37,
        user_seq: 1347,
        title: '무화과는 맛있지만 벌의 무덤이라고 합니다 우헤우헤우하하호호 안냐세연',
        description: '어쩌구저쩌구 무화과를 팔건데 맛있고 신선한 무화과입니다',
        image: `https://cdn.thefairnews.co.kr/news/photo/202311/18342_46615_5231.jpg`,
        starting_price: '15000d',
        current_bid_price: '20000',
        deadLine: '2024-06-16T21:00:00',
    },
    {
        seq: 38,
        user_seq: 1367,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-15T00:30:00',
    },
    {
        seq: 39,
        user_seq: 1367,
        title: '사과사과 새빨간 맛좋은 사과입니당 백설공주가 좋아하는 사과임당김재철바보',
        description: '어쩌구저쩌구 사과를 팔건데 맛있고 신선한 사과입니다',
        image: `https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-15T20:30:00',
    },
    {
        seq: 40,
        user_seq: 1788,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-17T19:44:00',
    },
    {
        seq: 41,
        user_seq: 1464,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T11:40:00',
    },
    {
        seq: 42,
        user_seq: 1464,
        title: '토마토마토마토 1kg는 많고 500g만 팔래잉...사실분?',
        description: '어쩌구저쩌구 토마토를 팔건데 맛있고 신선한 토마토입니다',
        image: `https://cdn.wadiz.kr/ft/images/green001/2022/0211/20220211135610805_56.jpg/wadiz/format/jpg/quality/80/`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-19T21:40:00',
    },
    {
        seq: 43,
        user_seq: 1788,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T23:18:00',
    },
    {
        seq: 44,
        user_seq: 1788,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T22:25:00',
    },
    {
        seq: 45,
        user_seq: 1788,
        title: '참외는 아삭아삭오속오속 노오랗고 맛있는 참외1kg 팔아영 구매하실 김재철구함',
        description: '어쩌구저쩌구 참외를 팔건데 맛있고 신선한 참외입니다',
        image: `https://www.ekr.or.kr/Kkrpub/webzine/2022/06/img/002season/season-1.jpg`,
        starting_price: '15000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T21:30:00',
    },
    {
        seq: 46,
        user_seq: 1234,
        title: '신선한 사과 5kg 판매합니다',
        description: '신선하고 달콤한 사과 5kg을 판매합니다. 맛보면 중독될 것입니다.',
        image: 'https://example.com/apple.jpg',
        starting_price: '25000',
        current_bid_price: '28000',
        deadLine: '2024-06-15T10:00:00',
    },
    {
        seq: 47,
        user_seq: 1245,
        title: '고급 산딸기 2kg 팝니다',
        description: '산딸기 중에서도 특급의 맛을 자랑하는 2kg을 판매합니다. 한 번 맛보면 잊지 못할 맛입니다.',
        image: 'https://example.com/strawberry.jpg',
        starting_price: '30000',
        current_bid_price: '32000',
        deadLine: '2024-06-15T12:00:00',
    },
    {
        seq: 48,
        user_seq: 1256,
        title: '신선한 오이 10개 팝니다',
        description: '농부가 직접 재배한 신선한 오이를 10개 팔아요. 무농약 재배로 안전합니다.',
        image: 'https://example.com/cucumber.jpg',
        starting_price: '12000',
        current_bid_price: '15000',
        deadLine: '2024-06-16T09:30:00',
    },
    {
        seq: 49,
        user_seq: 1267,
        title: '신선한 새송이 버섯 1kg 판매합니다',
        description: '산지에서 직접 채취한 신선한 새송이 버섯을 1kg 판매합니다. 요리에 최적입니다.',
        image: 'https://example.com/mushroom.jpg',
        starting_price: '18000',
        current_bid_price: '20000',
        deadLine: '2024-06-16T11:00:00',
    },
    {
        seq: 50,
        user_seq: 654,
        title: '신선한 청포도 3kg 팝니다',
        description: '신선하고 달콤한 청포도 3kg을 판매합니다. 여름철 상쾌한 감미로움을 선사합니다.',
        image: 'https://example.com/grapes.jpg',
        starting_price: '35000',
        current_bid_price: '38000',
        deadLine: '2024-06-17T10:30:00',
    },
    {
        seq: 51,
        user_seq: 345,
        title: '맛있는 파프리카 5개',
        description: '부드럽고 고소한 파프리카를 판매합니다.',
        image: 'https://example.com/paprika.jpg',
        starting_price: '15000',
        current_bid_price: '18000',
        deadLine: '2024-07-10T14:10:00',
      },
      {
        seq: 52,
        user_seq: 234,
        title: '신선한 당근 1kg',
        description: '신선하고 달콤한 당근을 판매합니다.',
        image: 'https://example.com/carrot.jpg',
        starting_price: '5000',
        current_bid_price: '7000',
        deadLine: '2024-07-11T16:25:00',
      },
      {
        seq: 53,
        user_seq: 7652,
        title: '달콤한 꿀 1kg',
        description: '양질의 꿀을 직접 생산하고 있습니다.',
        image: 'https://example.com/honey.jpg',
        starting_price: '30000',
        current_bid_price: '35000',
        deadLine: '2024-07-03T13:40:00',
      },
      {
        seq: 54,
        user_seq: 3453,
        title: '신선한 배 5개',
        description: '신선하고 달콤한 배를 판매합니다.',
        image: 'https://example.com/pear.jpg',
        starting_price: '20000',
        current_bid_price: '24000',
        deadLine: '2024-07-04T09:50:00',
      },
      {
        seq: 55,
        user_seq: 166,
        title: '상큼한 레몬 10개',
        description: '상큼하고 신선한 레몬을 판매합니다.',
        image: 'https://example.com/lemon.jpg',
        starting_price: '12000',
        current_bid_price: '15000',
        deadLine: '2024-07-05T12:15:00',
      },
      {
        seq: 56,
        user_seq: 985,
        title: '고소한 검은콩 2kg',
        description: '건강에 좋은 고소한 검은콩입니다.',
        image: 'https://example.com/blackbean.jpg',
        starting_price: '12000',
        current_bid_price: '14000',
        deadLine: '2024-07-06T14:30:00',
      },
      {
        seq: 57,
        user_seq: 5678,
        title: '신선한 키위 5개',
        description: '신선하고 고소한 키위를 판매합니다.',
        image: 'https://example.com/kiwi.jpg',
        starting_price: '15000',
        current_bid_price: '18000',
        deadLine: '2024-07-07T16:45:00',
      },
      {
        seq: 58,
        user_seq: 9876,
        title: '상큼한 감귤 2kg',
        description: '신선하고 달콤한 감귤입니다.',
        image: 'https://example.com/tangerine.jpg',
        starting_price: '10000',
        current_bid_price: '12000',
        deadLine: '2024-07-08T09:30:00',
      },
      {
        seq: 59,
        user_seq: 4489,
        title: '신선한 새송이 버섯 1kg',
        description: '자연에서 수확한 신선한 새송이 버섯입니다.',
        image: 'https://example.com/mushroom.jpg',
        starting_price: '8000',
        current_bid_price: '10000',
        deadLine: '2024-07-09T11:55:00',
      },
      {
        seq: 60,
        user_seq: 1523,
        title: '신선한 수박 10kg',
        description: '직접 농장에서 수확한 신선한 수박입니다.',
        image: 'https://example.com/watermelon.jpg',
        starting_price: '50000',
        current_bid_price: '60000',
        deadLine: '2024-06-29T17:30:00',
      },
]
export default data;