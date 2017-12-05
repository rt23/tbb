function seat() {
	var price = 100; //电影票价
	$(document).ready(function() {
		var $cart = $('#seats_chose'), //座位区
			$tickects_num = $('#tickects_num'), //票数
			$total_price = $('#total_price'); //票价总额
		var sc = $('#seat_area').seatCharts({
			map: [ //座位结构图 a 代表座位; 下划线 "_" 代表过道
				'cccccccccc',
				'cccccccccc',
				'__ccc_____',
				'cccccccc__',
				'cccccccccc',
				'cccccccccc',
				'cccccccccc',
				'cccccccccc',
				'cccccccccc',
				'cc__cc__cc'
			],
			naming: { //设置行列等信息
				top: false, //不显示顶部横坐标（行） 
				getLabel: function(character, row, column) { //返回座位信息 
					return column;
				}
			},
			legend: { //定义图例
				node: $('#legend'),
				items: [
					['c', 'available', '可选座'],
					['c', 'unavailable', '不可选'],
					['c', 'havailable', '已选']
				]
			},
			click: function() {
				if(this.status() == 'available') { //若为可选座状态，添加座位
					$('<li>' + (this.settings.row + 1) + '排' + this.settings.label + '座</li>')
						.attr('id', 'cart-item-' + this.settings.id)
						.data('seatId', this.settings.id)
						.appendTo($cart);
					$tickects_num.text(sc.find('selected').length + 1); //统计选票数量
					$total_price.text(getTotalPrice(sc) + price); //计算票价总金额
					return 'selected';
				} else if(this.status() == 'selected') { //若为选中状态
					$tickects_num.text(sc.find('selected').length - 1); //更新票数量
					$total_price.text(getTotalPrice(sc) - price); //更新票价总金额
					$('#cart-item-' + this.settings.id).remove(); //删除已预订座位
					return 'available';
				} else if(this.status() == 'unavailable') { //若为已售出状态
					return 'unavailable';
				} else {
					return this.style();
				}
			}
		});
		//设置已售出的座位
		sc.get(['1_3', '1_4', '4_4', '4_5', '4_6', '4_7', '4_8']).status('unavailable');
	});

	function getTotalPrice(sc) { //计算票价总额
		var total = 0;
		sc.find('selected').each(function() {
			total += price;
		});
		return total;
	}
}
seat();