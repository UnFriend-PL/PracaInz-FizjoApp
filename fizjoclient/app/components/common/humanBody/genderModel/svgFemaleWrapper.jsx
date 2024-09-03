import React from "react";

const SvgMaleWrapper = ({ children, scale, side, gender = "male" }) => {
  const viewBox = side === "front" ? "0 0 724 1448" : "724 0 724 1448";

  return (
    <svg
      viewBox={viewBox}
      height={400 * scale}
      width={200 * scale}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g strokeWidth={2} fill="none" strokeLinecap="butt">
        {gender === "male" && (
          <>
            {side === "front" && (
              <path
                stroke="#dfdfdf"
                d="M 309.48 168.91 Q 305.84 164.32 303.32 169.76 C 298.49 180.21 308.31 200.03 314.51 208.74 C 316.34 211.31 318.01 208.95 318.58 207.26 A 0.67 0.66 57.6 0 1 319.87 207.55 C 319.06 215.09 318.68 227.40 324.34 232.47 C 327.22 235.05 326.97 235.88 326.92 239.51 Q 326.68 255.16 323.97 266.82 Q 323.85 267.35 323.48 267.73 Q 308.61 282.73 290.26 293.23 C 278.34 300.05 267.53 299.26 253.00 298.03 Q 237.49 296.72 224.74 305.21 C 208.71 315.86 190.95 335.73 189.24 355.50 Q 186.95 381.81 190.53 412.66 C 190.79 414.92 190.69 417.49 191.02 419.92 Q 191.09 420.43 190.88 420.90 C 187.89 427.65 183.99 434.89 181.93 441.29 C 177.25 455.76 176.31 470.23 176.20 486.02 Q 176.20 486.51 175.90 486.90 C 159.84 507.69 147.56 529.29 141.49 554.95 Q 140.10 560.80 138.16 574.66 Q 131.28 623.74 118.11 671.52 C 115.99 679.21 112.98 690.29 104.08 693.63 Q 90.70 698.65 79.29 707.27 C 73.17 711.89 69.48 719.95 66.12 726.62 C 62.44 733.91 47.57 737.30 49.20 746.00 C 49.75 748.96 51.89 750.13 54.75 750.02 Q 67.27 749.50 74.18 740.00 C 76.03 737.45 77.93 736.62 80.54 735.24 Q 81.02 734.98 81.24 735.48 Q 84.59 743.00 80.47 750.73 Q 71.41 767.75 62.21 784.70 Q 60.53 787.81 59.49 791.20 C 57.52 797.69 65.78 800.84 69.45 795.20 C 76.80 783.92 82.72 773.30 92.55 762.52 Q 93.00 762.04 92.84 762.67 Q 87.89 783.24 79.07 802.44 C 77.36 806.17 75.64 812.30 79.19 815.18 C 89.50 823.53 107.08 773.44 109.24 767.88 A 0.37 0.36 -30.3 0 1 109.94 768.06 C 108.51 777.44 106.43 787.14 105.28 796.13 C 104.34 803.43 103.67 808.49 104.41 814.32 C 105.40 822.00 112.74 817.15 114.09 812.77 C 118.56 798.32 120.41 781.74 125.18 766.21 A 0.55 0.55 0.0 0 1 125.93 765.87 C 131.64 768.40 126.65 796.54 133.38 803.49 A 1.35 1.35 0.0 0 0 134.16 803.90 C 138.40 804.59 139.71 797.34 140.15 793.73 Q 141.74 780.80 142.58 767.76 Q 142.86 763.46 144.07 759.34 Q 150.39 737.64 154.77 715.46 Q 156.15 708.50 155.48 697.76 Q 154.48 681.63 161.99 665.46 Q 180.58 625.46 201.25 586.52 C 213.64 563.18 218.66 541.14 220.65 514.18 C 221.24 506.18 223.22 502.59 228.42 495.84 C 237.76 483.72 242.73 464.92 246.12 450.19 Q 246.24 449.64 246.75 449.42 L 250.30 447.82 A 0.49 0.49 0.0 0 1 250.99 448.23 Q 252.78 470.14 257.44 487.01 C 259.04 492.80 264.20 498.21 265.32 505.20 C 265.91 508.82 266.99 512.44 267.11 516.00 Q 267.57 529.33 266.95 540.50 C 265.58 565.32 263.85 592.20 259.98 619.13 C 258.39 630.19 253.14 640.55 250.52 651.43 Q 245.19 673.62 242.32 696.24 C 239.63 717.56 236.59 740.02 236.04 757.75 Q 234.98 791.48 237.98 842.55 Q 239.43 867.18 244.64 891.26 Q 247.76 905.70 255.88 917.90 Q 256.15 918.31 256.08 918.79 C 254.89 926.25 257.03 933.47 255.60 940.95 Q 252.28 958.32 251.77 975.98 C 251.55 983.43 252.85 991.28 253.67 998.93 Q 253.99 1001.95 253.29 1005.00 C 239.19 1067.03 246.93 1130.64 261.77 1190.07 C 266.01 1207.06 266.47 1222.37 264.71 1240.03 C 263.85 1248.62 262.10 1260.41 264.24 1268.75 C 266.05 1275.80 267.54 1287.46 261.78 1293.28 C 256.71 1298.39 242.40 1310.55 240.72 1316.98 C 239.19 1322.86 235.04 1332.26 242.29 1333.71 Q 242.69 1333.79 243.08 1333.66 L 244.23 1333.29 Q 245.05 1333.02 244.81 1333.85 C 242.95 1340.16 249.20 1340.52 253.77 1340.86 C 256.46 1341.06 257.37 1343.60 259.30 1344.71 Q 263.13 1346.91 267.14 1344.43 Q 267.59 1344.15 267.92 1344.56 Q 271.17 1348.61 276.21 1349.09 C 278.90 1349.35 281.27 1347.36 283.62 1346.09 Q 284.10 1345.82 284.44 1346.26 Q 288.33 1351.29 294.72 1351.38 C 295.77 1351.39 297.65 1351.62 298.54 1350.79 Q 301.20 1348.30 306.57 1341.58 C 312.04 1334.74 311.14 1328.85 310.29 1320.16 C 309.43 1311.33 311.17 1303.41 313.76 1295.20 C 315.84 1288.56 313.35 1280.06 314.07 1273.15 C 314.57 1268.39 315.80 1263.68 315.01 1259.02 C 314.06 1253.42 311.98 1247.60 311.31 1242.66 Q 309.57 1229.80 309.57 1219.75 Q 309.57 1192.29 313.54 1161.94 C 315.34 1148.21 319.24 1136.08 324.12 1123.46 Q 325.66 1119.48 326.10 1115.72 C 330.14 1081.34 326.20 1048.44 320.65 1013.26 C 319.84 1008.17 319.39 1002.54 321.72 997.72 C 328.03 984.68 329.28 969.38 329.07 954.15 C 329.01 949.50 327.95 944.55 327.58 939.63 C 327.13 933.64 329.28 925.78 330.82 919.80 C 334.72 904.69 337.76 888.96 341.43 874.30 Q 348.95 844.25 355.42 813.95 C 358.50 799.49 357.70 784.78 357.75 768.06 Q 357.78 756.80 356.36 748.81 Q 356.26 748.24 356.77 748.50 L 363.71 751.99 A 1.07 1.07 0.0 0 0 364.67 751.99 L 371.53 748.56 Q 372.07 748.29 371.98 748.89 C 369.47 765.94 370.28 783.04 371.30 800.17 Q 371.86 809.54 372.73 813.51 C 378.37 839.12 384.90 864.49 390.59 890.08 Q 394.83 909.20 399.51 928.22 C 400.58 932.58 401.13 937.66 400.58 941.57 C 398.11 958.92 398.53 982.22 407.11 998.54 C 408.41 1001.01 408.74 1005.35 408.31 1008.09 C 402.82 1043.75 398.07 1079.22 402.19 1115.33 Q 402.65 1119.34 404.21 1123.44 C 410.53 1140.06 413.55 1150.61 415.25 1164.75 C 418.31 1190.26 420.52 1218.43 416.79 1244.33 C 415.56 1252.86 411.78 1258.57 413.63 1267.80 Q 415.33 1276.21 414.16 1284.74 C 413.11 1292.39 415.65 1298.68 417.31 1305.89 C 419.02 1313.32 418.11 1320.99 417.47 1328.50 C 416.71 1337.55 423.74 1344.86 430.17 1350.90 A 1.48 1.46 -18.7 0 0 430.95 1351.28 Q 439.25 1352.41 444.03 1346.06 Q 444.40 1345.57 444.87 1345.96 Q 453.39 1352.89 460.49 1344.48 Q 460.81 1344.11 461.23 1344.37 C 469.09 1349.37 469.89 1340.80 474.98 1340.71 C 479.52 1340.64 485.21 1340.09 483.54 1333.77 Q 483.38 1333.17 483.97 1333.35 C 488.25 1334.67 490.66 1331.94 490.06 1327.75 C 489.09 1321.04 487.50 1314.41 483.44 1310.30 Q 474.77 1301.53 466.05 1292.83 C 461.19 1287.98 462.25 1276.40 463.74 1270.47 C 466.27 1260.35 464.49 1248.06 463.03 1236.25 C 461.04 1220.05 463.22 1204.28 467.41 1187.04 C 481.60 1128.60 488.89 1065.20 475.23 1006.07 C 473.92 1000.37 475.00 995.00 475.76 989.36 C 477.88 973.68 475.72 958.50 473.08 942.76 C 471.70 934.55 473.60 926.56 472.20 918.79 Q 472.11 918.30 472.39 917.89 C 483.07 902.63 486.53 880.99 488.49 863.25 C 492.12 830.38 492.47 797.34 492.26 764.31 C 492.11 741.56 488.80 719.07 486.12 696.53 C 484.30 681.19 480.76 664.32 477.47 649.99 C 474.89 638.73 469.69 628.87 468.04 617.25 C 465.37 598.45 464.19 580.92 462.40 556.31 Q 460.86 535.06 461.01 522.74 Q 461.13 512.05 463.22 504.00 C 464.54 498.90 468.30 493.91 469.91 489.46 C 474.50 476.74 476.10 461.71 477.56 448.28 Q 477.62 447.74 478.13 447.94 L 481.73 449.35 A 0.77 0.77 0.0 0 1 482.19 449.89 Q 486.03 466.84 492.52 482.96 C 494.16 487.04 496.63 491.75 500.12 495.79 C 505.75 502.32 507.17 507.95 508.00 517.24 C 509.72 536.47 512.15 552.06 518.89 569.24 Q 521.60 576.16 527.50 587.28 Q 543.57 617.60 558.56 648.47 C 566.04 663.89 571.90 675.54 572.85 690.59 Q 572.98 692.57 572.55 700.88 Q 572.12 709.31 573.99 718.25 Q 577.87 736.78 582.37 752.38 C 585.15 761.98 586.32 769.32 586.71 778.53 C 586.92 783.46 587.58 803.53 593.41 804.06 C 599.41 804.61 599.71 774.61 600.39 768.08 A 1.12 1.12 0.0 0 1 600.80 767.33 Q 601.30 766.93 601.62 766.30 A 1.39 1.00 59.0 0 1 603.70 767.19 C 607.27 782.50 609.43 797.55 614.25 812.25 C 615.52 816.12 618.33 820.08 622.81 817.38 A 1.18 1.17 -8.4 0 0 623.35 816.66 Q 624.98 810.32 624.13 803.72 Q 621.83 785.89 618.23 768.64 A 0.53 0.53 0.0 0 1 619.24 768.34 C 622.72 777.06 636.06 814.20 645.24 816.03 C 650.64 817.10 652.13 811.12 650.95 807.31 C 648.59 799.74 644.42 791.59 642.09 784.69 Q 638.29 773.46 635.22 761.98 A 0.15 0.14 -73.3 0 1 635.47 761.84 Q 640.35 767.61 644.90 773.66 C 649.45 779.70 653.60 787.18 658.03 793.93 Q 660.09 797.07 661.70 797.82 C 665.53 799.62 670.61 795.77 669.00 791.28 C 666.63 784.66 661.63 776.66 659.33 772.19 Q 654.22 762.29 648.82 752.53 C 645.43 746.40 644.71 741.93 646.89 735.59 Q 647.08 735.05 647.60 735.27 C 650.55 736.50 652.37 737.45 654.44 740.27 Q 661.27 749.61 673.53 749.92 C 681.25 750.12 680.47 740.89 676.20 738.28 C 671.33 735.31 664.61 731.14 661.97 725.94 C 657.98 718.11 654.62 711.26 649.21 707.28 Q 637.40 698.62 623.76 693.40 C 619.45 691.75 615.12 686.26 613.76 682.47 Q 608.42 667.65 602.70 641.81 Q 594.90 606.62 590.85 578.90 Q 588.46 562.58 587.74 559.15 C 582.02 531.75 569.74 509.81 552.98 487.61 C 551.81 486.06 551.91 485.12 551.97 483.26 Q 552.48 466.57 548.70 449.61 C 546.27 438.71 541.82 430.32 537.44 420.82 Q 537.22 420.36 537.28 419.85 C 539.40 398.94 540.83 377.68 539.05 356.70 C 537.31 336.13 521.34 317.28 504.86 306.23 C 494.75 299.45 485.77 296.97 473.93 298.16 Q 464.41 299.12 453.63 298.41 C 438.05 297.39 418.32 280.58 407.40 270.35 C 405.82 268.87 404.57 267.56 404.10 265.32 Q 401.24 251.68 401.26 237.76 Q 401.26 233.73 404.68 232.04 Q 405.14 231.82 405.39 231.38 C 409.76 223.86 408.77 215.16 408.75 206.85 A 0.38 0.38 0.0 0 1 409.48 206.69 C 410.36 208.62 412.01 211.62 414.22 208.45 C 421.05 198.67 427.45 183.93 425.97 172.00 C 425.49 168.15 422.83 165.91 418.91 167.68"
              />
            )}
            {side === "back" && (
              <path
                stroke="#dfdfdf"
                vectorEffect="non-scaling-stroke"
                d="M 1028.14 166.45 Q 1021.22 166.96 1021.73 176.02 C 1022.38 187.38 1027.41 200.00 1034.70 209.56 A 0.95 0.95 0.0 0 0 1035.77 209.88 Q 1037.97 209.08 1038.42 206.75 Q 1038.48 206.41 1038.79 206.56 C 1039.50 206.91 1039.29 219.51 1039.32 221.19 C 1039.41 225.63 1041.33 230.61 1045.48 233.58 A 1.48 1.46 -79.2 0 1 1046.03 234.40 C 1047.33 239.56 1046.14 264.59 1042.52 268.26 Q 1027.38 283.59 1008.53 293.99 C 997.30 300.18 985.80 298.88 972.00 298.05 C 960.16 297.34 951.79 300.13 941.86 307.09 C 927.96 316.83 911.37 335.39 909.24 353.00 C 906.85 372.86 908.46 396.71 910.58 417.97 Q 910.78 420.04 909.97 421.91 C 907.17 428.36 903.51 435.29 901.56 441.28 Q 895.91 458.72 896.11 477.26 Q 896.15 480.50 895.88 486.15 Q 895.86 486.66 895.55 487.06 C 879.06 508.02 866.67 530.27 860.84 556.43 Q 859.72 561.44 857.62 576.15 C 853.15 607.45 846.97 639.64 837.96 670.48 C 835.37 679.35 832.82 690.15 824.31 693.38 Q 811.21 698.35 799.91 706.70 C 793.05 711.77 790.22 717.94 785.68 726.75 C 782.37 733.16 764.38 739.29 769.45 747.77 C 771.01 750.37 774.09 750.14 776.79 749.81 Q 787.25 748.51 793.13 740.83 C 795.42 737.84 797.13 736.50 800.36 735.31 A 0.63 0.63 0.0 0 1 801.16 735.68 C 803.48 741.92 802.81 745.80 799.51 751.90 Q 789.51 770.39 779.78 789.01 C 775.87 796.49 784.57 802.15 789.55 794.51 C 796.72 783.50 802.47 773.20 812.06 762.59 Q 812.62 761.98 812.43 762.79 Q 807.49 783.70 798.01 804.03 Q 795.79 808.79 797.53 813.47 C 798.35 815.65 800.88 816.85 802.95 815.95 C 807.95 813.78 812.74 805.60 815.08 800.58 Q 820.51 788.92 825.23 776.95 Q 827.37 771.52 829.06 768.26 A 0.34 0.34 0.0 0 1 829.69 768.47 C 828.65 774.94 819.92 813.84 825.80 817.66 C 829.47 820.04 832.91 815.52 833.80 812.51 Q 838.73 795.91 842.08 776.75 C 842.69 773.31 843.62 770.03 844.54 766.92 A 1.49 1.49 0.0 0 1 847.45 767.13 C 849.06 778.16 848.17 788.91 850.91 799.85 C 851.57 802.48 854.41 806.12 856.99 802.69 C 861.32 796.92 861.47 780.19 861.98 770.25 C 862.50 760.22 866.62 750.03 868.70 741.28 C 871.57 729.16 876.10 714.64 875.42 700.50 C 874.79 687.46 876.48 676.40 882.00 664.53 Q 899.81 626.31 920.51 587.27 C 928.60 572.01 933.68 558.17 937.01 542.00 Q 938.40 535.24 940.57 511.31 C 941.06 506.01 943.33 501.94 947.04 497.29 C 957.02 484.77 962.25 465.95 965.86 450.00 Q 965.97 449.54 966.40 449.37 L 969.87 447.93 Q 970.39 447.72 970.44 448.27 C 972.08 465.19 974.18 483.97 982.58 498.42 Q 985.25 503.01 985.69 509.45 C 985.76 510.51 986.43 511.70 986.49 512.50 C 986.89 517.68 987.09 525.23 986.82 531.50 Q 985.00 573.11 980.47 614.52 C 978.98 628.13 972.65 640.33 969.66 653.60 C 966.01 669.78 963.02 685.46 961.19 702.45 C 959.24 720.52 956.19 739.39 955.83 756.75 C 954.96 797.57 955.28 842.51 962.96 884.21 C 965.15 896.11 968.33 907.72 975.37 917.40 A 1.48 1.46 27.9 0 1 975.65 918.29 C 975.42 926.20 976.32 934.21 975.03 942.01 C 971.89 960.94 969.95 978.86 973.41 997.96 C 973.70 999.53 973.58 1001.87 973.23 1003.42 C 959.26 1065.20 965.77 1130.76 981.86 1191.82 C 985.51 1205.68 986.32 1220.46 984.96 1234.92 C 984.02 1244.98 982.27 1255.20 983.30 1265.30 C 984.08 1272.87 988.23 1284.18 983.14 1291.21 C 978.75 1297.25 969.45 1303.98 963.07 1312.35 C 960.11 1316.25 952.52 1335.31 964.02 1333.54 Q 964.55 1333.46 964.42 1333.98 C 962.73 1340.59 969.52 1340.54 974.36 1340.95 Q 974.88 1341.00 975.24 1341.37 C 978.64 1344.83 981.89 1347.54 986.66 1344.41 Q 987.11 1344.12 987.46 1344.52 C 992.32 1350.09 997.09 1350.27 1003.06 1346.11 Q 1003.50 1345.80 1003.93 1346.12 C 1005.34 1347.18 1006.20 1348.82 1007.59 1349.58 Q 1011.98 1351.98 1017.08 1351.27 A 1.56 1.56 0.0 0 0 1017.93 1350.86 Q 1024.28 1344.70 1027.72 1339.46 C 1032.14 1332.71 1030.13 1325.67 1029.71 1317.92 C 1029.27 1309.96 1031.28 1302.44 1033.52 1294.97 C 1034.58 1291.42 1034.05 1286.50 1033.60 1282.59 Q 1032.89 1276.40 1034.01 1270.28 C 1034.95 1265.11 1035.75 1261.39 1034.60 1257.67 Q 1029.90 1242.46 1029.51 1227.25 Q 1028.64 1193.94 1033.40 1159.73 C 1035.13 1147.30 1038.92 1136.76 1043.43 1124.47 Q 1045.16 1119.75 1045.73 1115.31 C 1050.32 1079.07 1044.60 1044.51 1039.86 1008.73 C 1038.66 999.61 1043.98 993.60 1045.54 987.51 C 1048.41 976.36 1049.80 959.10 1047.93 945.66 C 1046.88 938.09 1047.48 931.84 1049.21 924.99 C 1053.15 909.35 1056.75 892.75 1059.78 880.01 Q 1066.27 852.63 1072.60 825.22 Q 1075.98 810.55 1076.49 805.75 Q 1077.50 796.31 1077.72 775.82 Q 1077.85 764.16 1076.54 752.58 Q 1076.32 750.58 1075.99 749.61 Q 1075.45 748.03 1076.95 748.78 L 1083.35 752.00 A 1.10 1.08 44.4 0 0 1084.32 752.00 L 1091.50 748.31 A 0.24 0.24 0.0 0 1 1091.84 748.59 Q 1090.49 753.63 1090.36 758.75 C 1089.82 779.99 1089.54 802.24 1094.28 822.45 Q 1101.55 853.47 1108.92 884.46 C 1111.25 894.25 1114.60 910.13 1117.95 922.87 C 1119.13 927.36 1119.75 931.95 1120.50 936.49 C 1121.14 940.42 1119.45 945.92 1119.24 949.53 Q 1118.26 966.73 1121.38 983.68 C 1121.98 986.96 1123.21 991.52 1124.54 993.96 C 1128.10 1000.50 1128.52 1004.24 1127.36 1012.10 C 1122.34 1046.29 1118.51 1078.84 1121.48 1113.50 C 1121.72 1116.32 1122.66 1120.49 1123.91 1123.73 C 1131.43 1143.10 1134.58 1156.98 1136.42 1177.99 C 1138.35 1200.12 1139.52 1222.20 1136.35 1244.60 Q 1135.88 1247.88 1134.29 1252.69 C 1132.00 1259.62 1132.37 1264.14 1133.83 1271.98 C 1135.50 1280.93 1132.17 1288.45 1134.90 1297.66 C 1136.88 1304.36 1138.19 1310.69 1137.87 1317.88 C 1137.58 1324.48 1135.49 1332.56 1139.15 1338.36 Q 1142.72 1344.04 1149.63 1350.84 Q 1149.97 1351.18 1150.46 1351.25 Q 1158.71 1352.49 1163.67 1346.15 A 0.64 0.64 0.0 0 1 1164.58 1346.04 Q 1173.02 1352.85 1180.03 1344.60 Q 1180.37 1344.20 1180.83 1344.46 Q 1186.12 1347.40 1190.08 1343.66 Q 1192.28 1341.58 1193.29 1341.22 C 1197.87 1339.60 1204.81 1341.71 1203.29 1333.67 A 0.39 0.39 0.0 0 1 1203.82 1333.23 L 1204.86 1333.62 Q 1205.25 1333.77 1205.65 1333.71 C 1212.46 1332.65 1209.17 1324.33 1208.00 1319.87 C 1205.32 1309.62 1192.63 1299.79 1185.30 1292.30 C 1180.77 1287.68 1182.22 1274.71 1183.62 1269.06 C 1186.76 1256.35 1182.79 1239.97 1182.29 1230.50 C 1181.63 1217.80 1182.70 1204.60 1185.99 1191.35 C 1200.90 1131.35 1208.58 1067.26 1194.98 1006.22 C 1193.56 999.84 1194.88 994.32 1195.73 987.24 C 1197.46 972.87 1195.00 955.62 1192.39 940.62 C 1191.27 934.14 1192.32 927.30 1192.25 920.69 Q 1192.25 920.23 1192.09 919.80 L 1191.79 918.97 Q 1191.59 918.45 1191.92 918.00 C 1199.57 907.39 1203.42 893.36 1205.50 881.25 C 1212.13 842.49 1212.38 800.86 1211.97 761.04 C 1211.76 739.76 1208.12 718.12 1205.90 696.81 Q 1204.13 679.89 1197.85 652.94 C 1194.73 639.58 1188.50 627.37 1187.05 613.69 Q 1183.04 575.93 1181.17 542.06 Q 1180.56 530.97 1180.85 518.01 C 1180.96 512.91 1182.20 504.08 1184.51 499.52 C 1186.81 494.98 1189.81 490.71 1191.01 485.74 Q 1195.45 467.32 1197.09 448.35 A 0.55 0.55 0.0 0 1 1197.86 447.90 L 1201.25 449.41 Q 1201.74 449.63 1201.86 450.16 C 1205.49 466.08 1210.60 484.96 1221.09 497.82 C 1229.48 508.13 1227.82 523.50 1229.73 535.92 C 1232.46 553.65 1237.66 569.19 1246.25 585.54 Q 1262.47 616.39 1284.56 662.22 Q 1292.50 678.70 1292.52 695.41 Q 1292.52 695.47 1292.20 701.94 C 1291.63 713.32 1294.91 723.91 1297.35 734.87 C 1300.01 746.89 1305.13 759.34 1305.74 772.33 C 1305.98 777.24 1306.66 804.29 1313.58 804.01 A 1.29 1.29 0.0 0 0 1314.41 803.66 C 1321.43 797.06 1316.55 769.02 1321.52 766.22 A 1.20 1.19 -21.2 0 1 1323.27 766.99 C 1326.58 781.35 1329.25 795.81 1332.92 809.99 C 1334.01 814.20 1338.07 821.55 1342.84 816.86 Q 1343.20 816.50 1343.28 816.00 Q 1344.28 809.42 1343.76 805.00 Q 1341.60 786.63 1337.95 768.42 A 0.48 0.48 0.0 0 1 1338.86 768.15 C 1342.31 776.96 1355.85 815.37 1366.03 816.16 C 1370.51 816.50 1371.54 810.41 1370.44 807.06 C 1367.79 798.97 1363.64 790.62 1361.28 783.45 Q 1357.86 773.08 1355.02 762.60 A 0.28 0.28 0.0 0 1 1355.50 762.34 Q 1359.72 767.36 1363.75 772.57 C 1368.83 779.14 1373.25 787.32 1378.17 794.66 Q 1379.99 797.36 1381.66 797.98 C 1384.30 798.97 1389.15 796.58 1388.99 793.50 Q 1388.85 790.72 1386.66 786.58 Q 1378.13 770.40 1369.24 754.42 C 1365.36 747.45 1364.08 743.12 1366.68 735.63 Q 1366.81 735.24 1367.20 735.38 Q 1371.90 736.99 1372.91 738.60 Q 1379.67 749.28 1393.03 749.97 C 1401.07 750.38 1400.13 741.50 1395.34 738.12 C 1390.41 734.62 1384.54 731.36 1381.93 726.55 C 1378.04 719.37 1374.79 711.78 1368.18 706.82 Q 1357.23 698.60 1343.50 693.43 C 1335.51 690.42 1332.54 680.64 1330.25 672.50 C 1321.70 642.22 1315.13 611.45 1310.75 580.29 Q 1308.97 567.62 1308.28 563.74 C 1302.89 533.66 1289.99 510.94 1272.05 486.75 Q 1271.76 486.36 1271.76 485.88 C 1271.89 470.59 1270.82 455.36 1265.92 440.80 C 1263.95 434.94 1260.59 428.46 1257.79 422.38 Q 1256.94 420.52 1257.10 418.48 C 1258.73 398.21 1260.25 378.73 1258.88 358.36 C 1257.39 336.36 1241.06 316.98 1223.33 305.40 C 1213.33 298.87 1205.11 297.32 1193.06 298.08 C 1179.40 298.94 1169.27 299.86 1157.52 293.24 Q 1139.58 283.12 1124.50 267.54 Q 1124.15 267.19 1124.04 266.70 Q 1121.33 254.82 1121.08 242.66 C 1120.97 237.52 1120.38 234.21 1124.51 231.78 Q 1124.95 231.52 1125.21 231.07 C 1128.92 224.63 1129.03 215.40 1128.17 207.76 Q 1128.08 207.01 1128.59 206.65 Q 1128.95 206.40 1129.15 206.78 L 1130.41 209.10 A 1.80 1.79 -42.1 0 0 1133.47 209.25 C 1138.33 202.11 1153.60 172.22 1141.68 166.80 Q 1141.16 166.57 1140.69 166.88 L 1138.38 168.39"
              />
            )}
          </>
        )}
        {gender === "female" && (
          <>
            {side === "front" && (
              <path
                stroke="#dfdfdf"
                vectorEffect="non-scaling-stroke"
                d="m 373.53,205.88 c -0.45333,0.42667 -0.81,0.91667 -1.07,1.47 -3.29333,7.06 -7.28,13.70667 -11.96,19.94 -2.14,2.84667 -4.41,5.19333 -6.81,7.04 -0.36158,0.27621 -0.53584,0.73316 -0.45,1.18 0.43333,2.3 0.96,4.58667 1.58,6.86 7,25.46 37.78,29.15 59.68,31.39 6.10667,0.62 12.19667,1.61 18.27,2.97 7.96,1.77333 14.17,3.97667 18.63,6.61 14.63,8.62 23.15,23.99 26.24,40.5 3.70667,19.74 5.03,39.49 3.97,59.25 -0.0526,0.96072 0.11501,1.92175 0.49,2.81 1.62,3.77333 3.20667,7.65 4.76,11.63 6.18,15.8 10.13333,32.57333 11.86,50.32 1.18,12.12 1.68,23.92667 1.5,35.42 -0.02,1.29333 0.40333,2.43333 1.27,3.42 17.89,20.25 33.57,44.36 41.14,69.73 2.5,8.36667 5.17333,17.90333 8.02,28.61 4.34,16.3 12.18,33.04 22.68,47.08 3.98,5.31333 7.70667,10.38667 11.18,15.22 0.59333,0.83333 1.35333,1.58333 2.28,2.25 0.28,0.2 0.59,0.3 0.93,0.3 4.22667,-0.0133 8.26333,1.50667 12.11,4.56 6.02,4.78 12.17,10.11667 18.45,16.01 1.51,1.42 3.29,2.63 5.25,3.29 9.2,3.11 19.48,8.17 17.09,19.99 -0.32,1.61 -1.49,2.31 -3.05,2.48 -4.18667,0.46 -8.50667,-0.5 -12.96,-2.88 -4.75333,-2.53333 -8.58667,-4.99667 -11.5,-7.39 -0.55333,-0.45333 -1.12667,-0.48 -1.72,-0.08 l -0.24,0.16 c -0.30375,0.208 -0.35544,0.63562 -0.11,0.91 5.52667,6.25333 9.60333,12.61667 12.23,19.09 4.1,10.08667 7.07333,20.87333 8.92,32.36 0.56667,3.52 0.71667,7.10333 0.45,10.75 -0.34667,4.75333 -3.07,6.62333 -8.17,5.61 -0.77333,-0.16 -1.02333,0.13 -0.75,0.87 0.75333,2.03333 1.44333,4.07 2.07,6.11 1.56,5.04667 -0.2,8.07 -5.28,9.07 -3.49,0.69 -5.42,-2.17 -7.04,-4.75 -0.35421,-0.55015 -1.1808,-0.475 -1.43,0.13 -1.26667,3.16 -3.75333,4.66 -7.46,4.5 -2.69,-0.11 -4.64,-2.56 -5.81,-4.72 -1.54,-2.84667 -3.06,-5.96667 -4.56,-9.36 -0.72,-1.63333 -1.17,-1.56 -1.35,0.22 -0.04,0.44667 -0.04,0.88667 0,1.32 0.0506,0.45209 -0.0911,0.90266 -0.39,1.24 -6.1,6.88 -17.12,-14.55 -18.83,-18.14 -5.52,-11.58 -10.07333,-23.92333 -13.66,-37.03 -2.86,-10.44 -5.67667,-21.13333 -8.45,-32.08 -1.38,-5.43 -3.45,-10.62 -6.82,-15.28 -15.64,-21.66 -32.51,-41.59 -48.94,-62.08 -10.83333,-13.5 -19.95333,-26.60333 -27.36,-39.31 -4.35333,-7.44667 -7.92667,-14.98 -10.72,-22.6 -2.62,-7.14 -4.03667,-14.75667 -4.25,-22.85 -0.06,-2.17 -1.76,-6 -3.08,-8.08 -1.58667,-2.49333 -2.99,-5.05667 -4.21,-7.69 -7.74667,-16.80667 -13.65,-34.53333 -17.71,-53.18 -1.79333,-8.22 -2.94,-15.92 -3.44,-23.1 -0.02,-0.26 -0.0933,-0.50333 -0.22,-0.73 -0.27333,-0.50667 -0.47333,-0.48 -0.6,0.08 -1.26667,5.63333 -3.42667,10.71333 -6.48,15.24 -1.95,2.89 -4.68,5.3 -7.05,7.94 -1.00667,1.12667 -1.63667,2.41333 -1.89,3.86 -0.28667,1.63333 -0.44,3.18667 -0.46,4.66 -0.32667,32.01333 -1.04333,63.59667 -2.15,94.75 -0.1,2.86 0.11,5.76 0.63,8.7 0.94,5.33 4.48,9.32 7.59,13.42 28.13,37.13 39.68,83.8 42.02,130.13 1.55333,30.82667 0.26333,61.91 -3.87,93.25 -3.72667,28.26 -8.91333,56.45333 -15.56,84.58 -6.84667,28.98667 -14.71333,57.40667 -23.6,85.26 -1.72,5.39333 -3.00667,10.55333 -3.86,15.48 -2.69333,15.53333 -4.80333,30.7733 -6.33,45.72 -0.42667,4.1533 -0.60333,7.9733 -0.53,11.46 0.0667,3.3133 0.56667,6.8767 1.5,10.69 5.34,21.8067 9.62333,42.4733 12.85,62 1.64667,9.9467 2.82333,20.4633 3.53,31.55 1.09333,17.08 -0.91667,33.71 -6.03,49.89 -4.02,12.69 -10.84,31.49 -15.29,47.24 -5.78,20.44 -10.58667,41.91 -14.42,64.41 -0.91333,5.3467 -1.38,10.3533 -1.4,15.02 -0.0267,5.0533 -0.14333,10.22 -0.35,15.5 -0.12,3.09 0.5,6 1.74,8.88 2.88,6.73 5.31,15.28 2.81,22.38 -2.82,8 4.32,16.54 8.4,22.9 3.28,5.1067 5.71,10.0833 7.29,14.93 1.9,5.85 8.39,13.01 13.6,16.02 5.4,3.11 7.35,6.81 7,13.31 -0.24,4.33 -3.01,4.97 -6.62,5.27 -7.24,0.5933 -14.49333,1.0133 -21.76,1.26 h -26.32 c -6.06667,-0.1867 -12.12,-0.4867 -18.16,-0.9 -3.61333,-0.2533 -5.87,-0.5367 -6.77,-0.85 -6.82,-2.36 -6.74,-17.36 -6.44,-23.15 0.40667,-8.0133 1.49333,-15.8467 3.26,-23.5 1.32,-5.74 2.15,-11.64 2.97,-17.44 0.64,-4.61 0.34,-9.01 0.02,-13.63 -0.32667,-4.6333 -0.007,-9.1933 0.96,-13.68 0.27333,-1.26 0.40667,-2.6733 0.4,-4.24 -0.12,-20.3133 -0.66333,-40.95 -1.63,-61.91 -0.51333,-11.08 -1.24333,-21.3933 -2.19,-30.94 -0.24667,-2.4467 -0.48333,-4.12 -0.71,-5.02 -2.64,-10.4267 -4.75,-19.4267 -6.33,-27 -5.83,-28 -8.22,-56.65 -5.12,-86.07 0.81,-7.69 2.63,-17.18 3.77,-25.59 0.82,-6.0933 1.79667,-12.4767 2.93,-19.15 1.72667,-10.1533 2.95333,-19.9667 3.68,-29.44 0.24667,-3.2667 0.18667,-7.8433 -0.18,-13.73 -0.8,-12.77 -0.72,-25.5 -0.94,-38.64 -0.08,-4.77 0.66,-9.26 -0.1,-14.08 -1.01,-6.35 -1.99,-12.68 -2.63,-19.09 -1.76,-17.5 -3.09333,-31.96333 -4,-43.39 -2.92,-36.9 -4.94333,-71.84333 -6.07,-104.83 -0.62,-18.13333 -0.83,-32.25333 -0.63,-42.36 0.23,-11.76 0.52,-22.64 2.96,-33.39 0.3,-1.31 1.07,-2.44 1.58,-3.7 0.21633,-0.51724 -0.21543,-1.07235 -0.77,-0.99 -5.92,0.89333 -11.68667,0.89 -17.3,-0.01 -0.50066,-0.0855 -0.88038,0.44258 -0.64,0.89 1.22,2.32667 2.01,4.64 2.37,6.94 0.99333,6.25333 1.60667,12.63 1.84,19.13 0.87,24.2 0.11,49.22 -1.04,73.76 -1.77333,37.8 -4.43667,76.32667 -7.99,115.58 -0.87333,9.67333 -2.03333,19.13333 -3.48,28.38 -0.55333,3.52667 -0.79667,7.11333 -0.73,10.76 0.2,11.4933 0.0733,23.2633 -0.38,35.31 -0.37,9.95 -1.13,19.25 -0.15,28.95 0.70667,7.04 1.66,14.1833 2.86,21.43 1.86,11.23 3.05,20.33 4.64,30.47 1.44,9.1533 2.34667,15.75 2.72,19.79 1.86,19.88 1.4,39.8167 -1.38,59.81 -2,14.42 -4.83333,28.62 -8.5,42.6 -1.35333,5.1667 -2.25667,9.95 -2.71,14.35 -0.58,5.6133 -1.02,11.07 -1.32,16.37 -1.40667,25.2467 -2.17333,50.6367 -2.3,76.17 -0.007,1.0667 0.1,2.0967 0.32,3.09 0.94,4.1867 1.30667,7.6833 1.1,10.49 -0.4,5.5 -0.49667,10.37 -0.29,14.61 0.18,3.78 1.45333,11.2467 3.82,22.4 2.32,10.94 3.14,21.2167 2.46,30.83 -0.23,3.23 -0.99,6.23 -2.37,9.18 -1.12,2.4067 -3.07,3.7633 -5.85,4.07 -6.41333,0.72 -12.86333,1.1733 -19.35,1.36 h -32.5 c -6.38667,-0.3133 -12.76333,-0.75 -19.13,-1.31 -2.99,-0.26 -5.8,-0.23 -6.38,-3.95 -0.89,-5.79 0.46,-11.19 5.65,-14.03 3.87333,-2.1133 7.71,-5.6967 11.51,-10.75 1.39333,-1.8467 2.39,-3.6933 2.99,-5.54 2.15,-6.58 6.15,-14.18 10.8,-20.3 3.01333,-3.9733 4.75333,-8.46 5.22,-13.46 0.14667,-1.5867 -0.03,-3.33 -0.53,-5.23 -2.08,-7.87 0.88,-16.6 4.1,-23.94 0.75,-1.74 0.92,-4.92 0.84,-6.79 -0.22,-5.6333 -0.35667,-11.2933 -0.41,-16.98 -0.0333,-4.0267 -0.50667,-8.5367 -1.42,-13.53 -4.55,-24.93 -9.62,-49.15 -17.21,-73.21 -3.40667,-10.7933 -7.04667,-21.86 -10.92,-33.2 -6.66667,-19.4867 -9.09333,-39.4767 -7.28,-59.97 1.06667,-11.9667 2.67667,-23.9133 4.83,-35.84 3.06667,-17.02 6.78333,-34.3733 11.15,-52.06 1.02,-4.14 1.58,-7.7567 1.68,-10.85 0.11333,-3.6133 -0.0567,-7.4867 -0.51,-11.62 -1.76667,-16.2533 -4.03333,-32.40667 -6.8,-48.46 -0.41333,-2.42 -0.96667,-4.71 -1.66,-6.87 -9.93333,-30.95333 -19.14,-64.33 -27.62,-100.13 -1.60667,-6.76 -3.05667,-13.43 -4.35,-20.01 -3.02667,-15.4 -5.79667,-32.35667 -8.31,-50.87 -4.47333,-32.97333 -6.08,-64.13333 -4.82,-93.48 1.96,-45.94 12.04,-90.97 37.47,-128.29 2.24,-3.3 4.7,-6.4 7.12,-9.46 4.15,-5.26 5.95,-10.32 5.77,-16.87 -0.93333,-32.91333 -1.63667,-65.25667 -2.11,-97.03 -0.03,-1.94 -0.52,-3.58 -0.98,-5.42 -0.33333,-1.32 -0.91,-2.49333 -1.73,-3.52 -2.11,-2.64 -4.96,-4.81 -6.7,-7.55 -2.83333,-4.43333 -4.92333,-9.26 -6.27,-14.48 -0.44667,-1.74 -0.80333,-1.72333 -1.07,0.05 -0.21,1.4 -0.01,2.99 -0.19,4.42 -3.26,25.04 -10.27667,49.07667 -21.05,72.11 -2.51,5.36 -6.73,10.25 -7.04,16.61 -0.88,17.8 -8.25,33.44 -17.63,48.71 -6.92667,11.28 -14.61,22.25333 -23.05,32.92 -2.86667,3.61333 -5.78667,7.31667 -8.76,11.11 -0.48667,0.62 -1.03,1.17667 -1.63,1.67 -0.61333,0.50667 -1.13,1.1 -1.55,1.78 -0.54667,0.9 -1.16333,1.77 -1.85,2.61 -12.59,15.4 -25.29,30.72 -36.86,46.89 -5.45,7.62 -7.87,18.03 -9.84,26.83 -3.593333,16.11333 -8.14,31.19333 -13.64,45.24 -2.493333,6.38667 -5.346667,12.43 -8.56,18.13 -1.8,3.2 -10.72,18.37 -15.54,12.26 -0.68,-0.86 -0.25,-2.07 -0.49,-3.02 -0.326667,-1.25333 -0.753333,-1.28667 -1.28,-0.1 -1.83,4.14 -5.34,14.31 -10.67,14.48 -3.546667,0.10667 -5.953333,-1.43333 -7.22,-4.62 -0.209662,-0.51969 -0.897493,-0.62508 -1.24,-0.19 -0.76,0.94667 -1.49,1.90333 -2.19,2.87 -2.2,3.05 -6.34,2.41 -9.1,0.4 -3.57,-2.59 -0.63,-10.37 0.9,-13.45 0.236418,-0.45407 -0.157897,-0.97982 -0.66,-0.88 -2.81,0.51 -6.84,0.27 -7.75,-3 -1.3,-4.73 -0.81,-9.94 0.05,-14.85 1.773333,-10.17333 4.316667,-19.64333 7.63,-28.41 3.18,-8.41333 7.573333,-15.49667 13.18,-21.25 0.322884,-0.3286 0.340328,-0.84758 0.04,-1.19 -0.293333,-0.34 -0.703333,-0.50667 -1.23,-0.5 -0.278815,6e-5 -0.546543,0.0916 -0.76,0.26 -4.246667,3.34667 -9.05,6.25667 -14.41,8.73 -1.546667,0.70667 -3.236667,1.18333 -5.07,1.43 -3.24,0.44 -7.32,1.02 -8.34,-3.06 v -5.04 c 1.89,-8.36 10.71,-11.9 18.05,-14.48 1.214197,-0.42225 2.32994,-1.08557 3.28,-1.95 4.853333,-4.38 9.59,-8.60667 14.21,-12.68 4.72,-4.16 11.45,-9.69 17.55,-8.89 0.42,0.0533 0.796667,-0.0467 1.13,-0.3 0.92,-0.7 1.69,-1.49333 2.31,-2.38 2.833333,-4.10667 5.91,-8.36 9.23,-12.76 3.766667,-4.99333 6.703333,-9.25 8.81,-12.77 6.546667,-10.92667 11.606667,-22.59667 15.18,-35.01 2.026667,-7.06667 3.946667,-14.08667 5.76,-21.06 5.72,-22.05333 15.62667,-42.48333 29.72,-61.29 4.66,-6.22 9.65667,-12.45667 14.99,-18.71 0.39308,-0.46353 0.60294,-1.054 0.59,-1.66 -0.28,-12.94667 0.27,-25.82667 1.65,-38.64 2.22667,-20.61333 7.64667,-40.31667 16.26,-59.11 0.53333,-1.15333 0.76,-2.34333 0.68,-3.57 -1.06,-16.84667 -0.0433,-35.03667 3.05,-54.57 3.2,-20.24 13.06,-40.07 33.4,-47.77 5.15333,-1.95333 10.72667,-3.49333 16.72,-4.62 1.53333,-0.28667 7.27,-1.04667 17.21,-2.28 7.33333,-0.90667 14.61333,-2.13667 21.84,-3.69 9.63333,-1.85333 18.05333,-5.90667 25.26,-12.16 0.35333,-0.30667 0.64,-0.65667 0.86,-1.05 0.61333,-0.13333 1.14,-0.47333 1.58,-1.02 4.60667,-5.78667 7.37667,-12.60667 8.31,-20.46 0.0467,-0.42667 -0.10333,-0.76 -0.45,-1 -3.21333,-2.21333 -6.00333,-5.19 -8.37,-8.93 -0.12667,-0.20667 -0.29667,-0.25333 -0.51,-0.14 -0.12,0.0667 -0.20333,0.13667 -0.25,0.21 -0.11333,-0.71333 -0.36667,-1.38 -0.76,-2 -6.65333,-10.54 -11.87,-21.78 -15.65,-33.72 -0.14124,-0.44693 -0.52604,-0.77342 -0.99,-0.84 -4.45,-0.65 -6.81,-5.29 -8.11,-9.16 -2.44667,-7.28667 -3.74667,-15 -3.9,-23.14 -0.0333,-1.54 0.38667,-2.85667 1.26,-3.95 0.24667,-0.30667 0.56333,-0.44667 0.95,-0.42 0.94667,0.08 1.88667,0.10333 2.82,0.07 5.42,-0.17 7.25,-5.92 8.02,-10.27 1.31,-7.45 2.25,-14.74 4.33,-22.04 0.17452,-0.60386 0.64526,-1.07836 1.25,-1.26 10.82,-3.22 21.32,-7.26333 31.5,-12.13 8.3,-3.96 16.2,-9.09 23.95,-14.33 4.34667,-2.933333 9.10667,-4.106667 14.28,-3.52 10.03,1.15 20.04,4.55 29.47,7.81 0.67736,0.236152 1.23278,0.741083 1.54,1.4 1.14667,2.5 1.93667,5.07333 2.37,7.72 1.68,10.24 3.37667,19.77333 5.09,28.6 0.87,4.45 3.85,17.51 9.55,17.9 1.3,0.0933 2.66,0.0167 4.08,-0.23 0.42,-0.0733 0.81,0.007 1.17,0.24 1.26,0.8 1.89,1.95333 1.89,3.46 0.03,6.92 -2.08,32.36 -11.81,33.17 -0.47681,0.0359 -0.88461,0.36051 -1.03,0.82 -1.62,5.23333 -3.67333,10.6 -6.16,16.1 -0.06,0.13333 -0.0233,0.23 0.11,0.29 z"
              />
            )}
            {side === "back" && (
              <path
                stroke="#dfdfdf"
                vectorEffect="non-scaling-stroke"
                d="m 1194.44,206.54 c -3.1933,7.99333 -7.4233,15.23333 -12.69,21.72 -1.88,2.31333 -3.8467,4.26333 -5.9,5.85 -0.3221,0.24773 -0.4893,0.65057 -0.44,1.06 3.86,33.54 38.8,35.87 65.04,39.05 5.0133,0.60667 10.6067,1.62667 16.78,3.06 6.38,1.47333 11.8067,3.52333 16.28,6.15 14.57,8.53 23.01,23.61 26.16,40.09 3.7067,19.35333 5.04,39.21333 4,59.58 -0.05,0.96 0.16,2.23 0.57,3.12 9.9467,21.58667 15.71,44.73333 17.29,69.44 0.68,10.58667 0.91,19.95333 0.69,28.1 -0.02,0.86667 0.24,1.61 0.78,2.23 20.32,23.24 35.91,47.88 43.7,77 2.9133,10.89333 5.7433,20.80667 8.49,29.74 0.66,2.16667 1.44,4.27667 2.34,6.33 1.21,2.76 2.01,5.57 3.3,8.27 4.7267,9.88 8.63,16.84333 11.71,20.89 4.8733,6.39333 9.5,12.74333 13.88,19.05 0.6933,1 1.65,1.84 2.87,2.52 0.3,0.16667 0.6233,0.22667 0.97,0.18 4.82,-0.67 9.68,2.86 13.34,5.7 5.3867,4.2 10.4167,8.55 15.09,13.05 0.97,0.94 1.8,2.19 2.81,3.29 0.3867,0.42 0.87,0.71333 1.45,0.88 5.7467,1.69333 10.6367,3.94333 14.67,6.75 2.88,2.01333 4.6733,4.89667 5.38,8.65 v 5.01 c -0.52,1.79333 -1.6,2.74667 -3.24,2.86 -8.83,0.63 -17.91,-4.96 -24.24,-10.42 -0.64,-0.55333 -1.33,-0.62333 -2.07,-0.21 -0.28,0.15333 -0.45,0.41667 -0.51,0.79 -0.057,0.35981 0.054,0.72465 0.3,0.99 5.3933,5.72667 9.5833,12.27333 12.57,19.64 4.7133,11.63333 7.6733,23.37333 8.88,35.22 0.3333,3.31333 0.1933,6.36 -0.42,9.14 -0.83,3.72 -5.18,3.88 -8.31,3.66 -0.52,-0.0333 -0.6533,0.18 -0.4,0.64 1.5,2.73 4.15,9.73 2.03,12.51 -1,1.30667 -2.52,2.16 -4.56,2.56 -4.54,0.9 -5.48,-2.28 -7.85,-5.13 -0.3467,-0.42 -0.6133,-0.37 -0.8,0.15 -1.2067,3.36667 -3.7533,5.02 -7.64,4.96 -5.04,-0.09 -8.71,-10.14 -10.3,-14.11 -0.1733,-0.44667 -0.48,-0.77667 -0.92,-0.99 -0.4333,-0.20667 -0.6367,-0.07 -0.61,0.41 0.05,0.96 0.3,2.27 -0.22,3.1 -2.45,4 -7.21,0.07 -9.25,-2.45 -6.33,-7.84 -10.51,-16.48 -14.43,-25.97 -7.25,-17.58 -11.84,-37.32 -16.85,-56.41 -1.8,-6.87333 -3.2867,-11.19667 -4.46,-12.97 -6.3,-9.52 -14.4333,-20.36333 -24.4,-32.53 -15.11,-18.44 -29.91,-36.58 -44.05,-56.48 -8.8867,-12.51333 -15.8167,-24.99667 -20.79,-37.45 -2.9,-7.26667 -4.54,-15.05333 -4.92,-23.36 -0.09,-2.06 -0.75,-5.35 -1.64,-6.88 -5.3667,-9.18 -10.0867,-19.62333 -14.16,-31.33 -5.5933,-16.06667 -9.42,-30.98 -11.48,-44.74 -0.5467,-3.64 -0.91,-7.31333 -1.09,-11.02 -0.02,-0.32082 -0.3917,-0.48585 -0.63,-0.28 -0.1467,0.12 -0.2433,0.27667 -0.29,0.47 -1.2067,4.74 -3,9.11667 -5.38,13.13 -2.37,4.01 -6.03,7.14 -9.19,10.5 -0.7933,0.84667 -1.1967,1.84 -1.21,2.98 -0.38,33.86 -1.11,67.63667 -2.19,101.33 -0.1067,3.46667 0.3633,6.71667 1.41,9.75 1.67,4.83 5.75,8.89 8.75,13.05 19.15,26.59 30.52,57.65 35.84,89.85 6.62,39.99 5.98,81.18 1.39,121.55 -3.84,33.71333 -10.1567,68.23667 -18.95,103.57 -6.83,27.43 -13.74,52.3 -21.61,77.01 -1.6733,5.24 -3.05,11.17 -4.13,17.79 -2.6533,16.18 -4.6633,31.1133 -6.03,44.8 -0.51,5.14 -0.61,10.65 0.59,15.86 5.77,24.99 11.41,49.88 14.89,74.82 3.08,22 3.85,44.08 -1.95,65.56 -1.4733,5.4533 -3.1167,10.8133 -4.93,16.08 -7.4333,21.5733 -13.27,40.8667 -17.51,57.88 -3.1933,12.82 -6.2867,27.8233 -9.28,45.01 -0.8533,4.9 -1.2833,9.47 -1.29,13.71 0,5.1267 -0.1567,10.5767 -0.47,16.35 -0.11,2.14 0.27,4.76 1.1,6.78 2.72,6.61 5.78,14.73 4.14,21.82 -0.7333,3.1933 -1.0333,5.4033 -0.9,6.63 0.5,4.5133 1.6433,8.1033 3.43,10.77 4.73,7.07 9.6,13.97 12.12,21.89 0.82,2.56 1.88,4.7267 3.18,6.5 3.39,4.64 7.22,8.38 11.93,11.17 4.9267,2.9133 6.7967,7.6333 5.61,14.16 -0.18,0.9867 -0.6533,1.7833 -1.42,2.39 -0.8133,0.6467 -1.7933,1.0233 -2.94,1.13 -7.8467,0.7333 -15.72,1.2367 -23.62,1.51 h -29.64 c -6.9533,-0.1733 -13.86,-0.7167 -20.72,-1.63 -11.07,-1.47 -6.82,-32.77 -5.45,-39.86 1.26,-6.5067 2.58,-13.45 3.96,-20.83 1.32,-7.07 0.48,-13.46 0.26,-20.34 -0.1,-3.0067 0.2633,-6.4067 1.09,-10.2 0.26,-1.1733 0.3833,-2.57 0.37,-4.19 -0.1667,-20.2733 -0.7433,-42.1 -1.73,-65.48 -0.36,-8.34 -1.49,-16.99 -2.01,-25.27 -0.24,-3.7667 -0.8367,-7.5333 -1.79,-11.3 -2.8933,-11.5067 -5.1867,-21.89 -6.88,-31.15 -5.23,-28.74 -6.77,-58.03 -2.4,-86.44 2.09,-13.61 3.96,-27.35 6.27,-41.17 1.75,-10.47 3.26,-21.86 2.95,-33.05 -0.14,-4.9733 -0.3267,-10.2533 -0.56,-15.84 -0.4933,-11.92 -0.62,-23.23 -0.38,-33.93 0.087,-3.87333 -0.1633,-7.57667 -0.75,-11.11 -1,-6.06 -1.7367,-11.46667 -2.21,-16.22 -3.42,-34.68 -6.0767,-69.28 -7.97,-103.8 0,-0.0533 -0.38,-6.34667 -1.14,-18.88 -0.4333,-7.26 -0.7467,-14.53 -0.94,-21.81 -0.63,-23.97 -1.5,-48.33 0.89,-71.9 0.4533,-4.42 1.46,-8.21 3.02,-11.37 0.36,-0.73333 0.1367,-1.04333 -0.67,-0.93 -5.8,0.84667 -11.6067,0.83667 -17.42,-0.03 -0.5299,-0.077 -0.9242,0.47626 -0.67,0.94 1.1333,2.14 1.9167,4.39667 2.35,6.77 1.12,6.10667 1.78,12.78 1.98,20.02 0.52,19.33333 0.3867,38.51 -0.4,57.53 -2.02,49.02667 -5.3733,97.3 -10.06,144.82 -0.52,5.35 -1.42,10.71 -2.3,15.99 -0.5267,3.13333 -0.71,6.57 -0.55,10.31 0.22,4.96 0.2333,11.2 0.04,18.72 -0.24,9.2533 -0.53,18.5133 -0.87,27.78 -0.2,5.5333 -0.1433,10.4367 0.17,14.71 0.97,13.22 3.44,26.19 5.52,39.19 0.95,5.97 1.46,11.9 2.57,17.8 0.8133,4.32 1.46,8.6767 1.94,13.07 1.96,18.0733 2.0133,35.9033 0.16,53.49 -1.8,17.0067 -5.0233,34.5367 -9.67,52.59 -2.95,11.44 -3.63,22.52 -4.25,34.04 -1.2133,22.8933 -1.9,46.4567 -2.06,70.69 -0.013,2.6333 0.2133,5.2833 0.68,7.95 0.7533,4.2333 0.8467,9.2767 0.28,15.13 -0.34,3.5667 -0.2167,7.1567 0.37,10.77 1.0467,6.4333 2.1533,12.37 3.32,17.81 2.22,10.4 3.1733,20.2067 2.86,29.42 -0.14,4 -1.31,13.61 -5.91,15.24 -1.0133,0.3533 -2.0233,0.5833 -3.03,0.69 -6.26,0.6667 -12.55,1.0867 -18.87,1.26 H 1067 c -7.78,-0.2333 -15.53,-0.7367 -23.25,-1.51 -1.86,-0.19 -3.74,-1.13 -4.17,-3.14 -1.18,-5.57 0.09,-11.6 5.24,-14.4 4.46,-2.4267 8.6867,-6.4067 12.68,-11.94 1.1067,-1.54 1.9233,-3.2267 2.45,-5.06 1.3933,-4.8133 3.7333,-9.6767 7.02,-14.59 4.27,-6.37 10.95,-15.11 8.31,-23.7 -2.33,-7.59 0.58,-16.42 3.66,-23.53 0.8467,-1.9533 1.2233,-4.17 1.13,-6.65 -0.2467,-6.8467 -0.4367,-13.7033 -0.57,-20.57 -0.033,-1.8667 -0.22,-3.81 -0.56,-5.83 -0.53,-3.2 -0.78,-6.73 -1.93,-9.76 -0.57,-1.5 -0.46,-3.15 -0.75,-4.77 -4.4733,-25.64 -10.98,-51.18 -19.52,-76.62 -3.36,-10.0067 -6.23,-18.8433 -8.61,-26.51 -7.77,-24.97 -6.7,-50.73 -2.58,-76.67 3.0467,-19.1533 6.7333,-37.8133 11.06,-55.98 1.1133,-4.6733 2.1367,-9.5867 3.07,-14.74 0.7,-3.8333 0.7667,-8.9667 0.2,-15.4 -1.2667,-14.4467 -3.38,-29.87333 -6.34,-46.28 -1,-5.51333 -2.38,-11.08667 -4.14,-16.72 -8.6467,-27.59333 -16.36,-55.65333 -23.14,-84.18 -8.5133,-35.84 -14.49,-70.90333 -17.93,-105.19 -0.4067,-4.04 -0.95,-11.70667 -1.63,-23 -1.22,-20.12 -1.02,-40.2 0.6,-60.24 3.52,-43.7 15.84,-88.99 43.59,-123.06 4.52,-5.55 6.08,-10.55 5.88,-17.54 -1.0333,-36.71333 -1.7333,-70.39333 -2.1,-101.04 -0.013,-1.10667 -0.4167,-2.11333 -1.21,-3.02 -2.98,-3.41 -6.55,-6.22 -9.01,-10.18 -2.5267,-4.07333 -4.3433,-8.49 -5.45,-13.25 -0.027,-0.10667 -0.07,-0.20667 -0.13,-0.3 -0.073,-0.10667 -0.1467,-0.21 -0.22,-0.31 -0.38,-0.51333 -0.5867,-0.45333 -0.62,0.18 -0.1867,3.36 -0.5267,6.65667 -1.02,9.89 -3.18,20.91333 -9.0933,41.41667 -17.74,61.51 -2.1133,4.92 -4.57,9.73 -7.37,14.43 -1.38,2.31 -2.25,5.72 -2.35,8.5 -0.38,9.91333 -3.2067,20.34667 -8.48,31.3 -7.4,15.34 -17.09,29.69 -27.13,42.67 -11.44,14.81333 -24.26,30.94 -38.46,48.38 -8.59333,10.55333 -14.80667,18.88 -18.64,24.98 -2.16,3.44 -3.79333,7.21667 -4.9,11.33 -2.61333,9.71333 -5.20667,19.74667 -7.78,30.1 -1.21,4.83 -2.87,9.61 -4.37,14.42 -3.3,10.52667 -7.59333,20.83 -12.88,30.91 -1.67,3.2 -10.9,19.01 -16.08,13.75 -1.3,-1.32 -0.2,-2.61 -0.65,-3.85 -0.0533,-0.14 -0.15333,-0.22667 -0.3,-0.26 -0.33012,-0.0685 -0.66217,0.10802 -0.79,0.42 -1.68,3.98 -3.62333,7.83333 -5.83,11.56 -0.94,1.58 -2.4,2.82 -4.28,3.05 -3.94,0.48 -6.68,-1.13 -8.22,-4.83 -0.16296,-0.39045 -0.6952,-0.44195 -0.93,-0.09 -1.99,2.98 -3.89,6.12 -8.16,5 -2.69,-0.7 -5.36,-2.74 -4.91,-5.86 0.48,-3.3 1.34667,-6.37 2.6,-9.21 0.18054,-0.42201 -0.17743,-0.87656 -0.63,-0.8 -5.15,0.91 -8.19,-0.82 -8.39,-6.31 -0.14667,-4.06667 0.12333,-8.13667 0.81,-12.21 1.31333,-7.76667 3.32,-15.66 6.02,-23.68 3.48667,-10.37333 8.34,-18.76333 14.56,-25.17 0.38644,-0.4062 0.40798,-1.03511 0.05,-1.46 l -0.17,-0.21 c -0.54667,-0.65333 -1.14333,-0.70333 -1.79,-0.15 -4.04667,3.45333 -8.69333,6.37333 -13.94,8.76 -3.02,1.37333 -6.48333,1.99333 -10.39,1.86 -3.46,-0.12 -3.45,-3.61 -3.44,-6.16 0.02,-4.34667 1.84333,-7.82667 5.47,-10.44 3.33333,-2.40667 6.65333,-4.09333 9.96,-5.06 1.32,-0.38 2.59,-0.92333 3.81,-1.63 1.28,-0.73333 2.43,-1.57 3.45,-2.51 6.56667,-6.04 12.46,-11.28 17.68,-15.72 3.81333,-3.24 8.22333,-4.90333 13.23,-4.99 0.32334,-0.007 0.63475,-0.1269 0.88,-0.34 1.22,-1.1 2.23,-2.23 3.03,-3.39 2.92667,-4.25333 5.90333,-8.36333 8.93,-12.33 11.3,-14.82 19.21,-31.53 23.99,-49.16 2.43333,-8.99333 4.79667,-17.43667 7.09,-25.33 5.16667,-17.75333 13.26,-34.42 24.28,-50 5.38667,-7.60667 11.22333,-15.08 17.51,-22.42 0.78,-0.91 1.44,-1.79 1.43,-3.05 -0.04,-7.18667 0.15333,-15.32333 0.58,-24.41 1.2,-25.27333 6.98,-49.66 17.34,-73.16 0.47,-1.06 0.82,-2.02 0.74,-3.23 -1.05333,-16.56667 -0.03,-34.73667 3.07,-54.51 2.8,-17.8 10.26,-34.46 25.25,-43.96 4.9733,-3.16 11.2333,-5.6 18.78,-7.32 9.1267,-2.08667 18.7767,-3.55 28.95,-4.39 4.42,-0.36667 10.0367,-1.44667 16.85,-3.24 10.1122,-2.54586 26.2145,-13.0245 27.26,-14.15 4.52,-6.03333 7.2267,-12.83 8.12,-20.39 0.031,-0.22254 -0.061,-0.44444 -0.24,-0.58 -3.2333,-2.39333 -6.22,-5.54333 -8.96,-9.45 l -0.39,-12.23 c -0.01,-0.33918 0.3411,-0.57024 0.65,-0.43 15.8831,7.16 15.9397,7.22024 19.73,8.28 4.4042,0.92173 8.3867,0.98 12.58,1.47 4.92,0.4 9.14,0.52 12.66,0.36 1.7667,-0.08 3.9733,-0.45333 6.62,-1.12 l 12.92,-3.7 c 9.58,-3.26667 19.2933,-6.93333 29.14,-11 z"
              />
            )}
          </>
        )}
      </g>
      {children}
    </svg>
  );
};

export default SvgMaleWrapper;
