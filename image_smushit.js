/**
 * @date 2014/09/03
 */
var minifier = require('node-smushit');
var log4js = require('log4js');
var logger = log4js.getLogger();

var util = (function() {
    var src_total_size = 0;     // 记录输入图片总大小
    var dest_total_size = 0;    // 记录输出图片总大小
    var total_percent;          // 记录总的压缩率

    var total = 0;              // 图片总个数
    var saving = 0;             // 需要压缩的图片总个数

	var pub = {};

    // 递增图片总个数
    pub.increaseTotal = function() {
        total = total + 1;
    };

    // 获取图片总个数
    pub.getTotal = function() {
        return total;
    };

    // 递增需要压缩的图片总个数
    pub.increaseSaving = function() {
        saving = saving + 1;
    };

    // 获取需要压缩的图片总个数
    pub.getSaving = function() {
        return saving;
    };

    // 递增输入图片大小
    pub.increaseSrcTotalSize = function(itemSize) {
        src_total_size = src_total_size + itemSize;
    };

    // 获取输入图片总大小
    pub.getSrcTotalSize = function() {
        return src_total_size;
    };

    // 递增输出图片总大小
    pub.increaseDestTotalSize = function(itemSize) {
        dest_total_size = dest_total_size + itemSize;
    };

    // 获取输出图片总大小
    pub.getDestTotalSize = function() {
        return dest_total_size;
    };

    // 计算压缩率
    pub.computeTotalPercent = function() {
        total_percent = ((src_total_size - dest_total_size) / src_total_size * 100).toFixed(2) + '%';
    };

    // 获取压缩率
    pub.getTotalPercent = function() {
        return total_percent;
    };

    // 压缩图片与原图片的大小差值，即节省了多少字节
    pub.getReduce = function() {
        return src_total_size - dest_total_size;
    };

    return pub;
})();

// 打印日志
var printResult = function() {
    logger.info('图片总个数：' + util.getTotal());
    logger.info('无损压缩图片总个数：' + util.getSaving());

    logger.info('输入需要压缩的图片总大小：' + util.getSrcTotalSize() + ' Bytes');
    logger.info('输出经过压缩的图片总大小：' + util.getDestTotalSize() + ' Bytes');
    logger.info('-------------共节省大小：' + util.getReduce() + ' Bytes');
    logger.info('压缩率（相对输入图片总大小）：' + util.getTotalPercent());
};


// 这里可以指定多个图片文件夹目录，用数组表示
minifier.smushit(['./static/img/'], {

    // 循环遍历文件夹及其子目录中的图片设置
    // true: 遍历循环
    // false: 非遍历循环
    recursive: true,

    // 每张图片开始压缩
    onItemStart: function(item) {
        // 这里的item是每张输入图片的源地址
    },

    // 每张图片完成压缩
    onItemComplete: function(e, item, response) {
		/**
         * response的格式——
         * {
         *      src: '',
         *      src_size: ,
         *      dest: '',
         *      dest_size: ,
         *      percent: ,
         *      id: ''
         * }
         */

        // 过滤掉svn目录中的文件
        if (/.svn/g.test(response.src) === false) {
            util.increaseTotal();

			/*
             * 注意：
             * 当检测到某些图片已经无法压缩或者已经经过压缩，此时response.src_size的值是undefined
             * 因此在这儿加入一层过滤，针对可以压缩的图片进行统计
             */
            if (response.src_size && response.dest_size) {
                util.increaseSaving();
                util.increaseSrcTotalSize(response.src_size);
                util.increaseDestTotalSize(response.dest_size);
            }
        }

    },

    // 所有图片完成压缩
    // 这里的reports变量记录所有图片的源地址、源大小、目标地址、目标大小、压缩率等信息的列表
    onComplete: function(reports) {

        // 统计压缩率
        util.computeTotalPercent();

        // 打印统计日志
        printResult();
    }
});
