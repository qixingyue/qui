describe("rangepicker 测试", function() {
    "use strict";

    it("rangepicker 是一个函数", function() {
        expect($.fn.rangepicker).is.an("function");
    });

    describe("必须参数测试", function() {
        it("没有 startValue 应该抛出错误", function() {
            var options = {
                endValue: "100",
                translateSelectLabel: function() {
                    return "test";
                }
            };

            expect(function() {
                $("#range_picker").rangepicker(options);
            }).to.throw(Error);
        });

        it("没有 endValue 应该抛出错误", function() {
            var options = {
                startValue: 0,
                translateSelectLabel: function() {
                    return "test";
                }
            };

            expect(function() {
                $("#range_picker").rangepicker(options);
            }).to.throw(Error);
        });

        it("没有 translateSelectLabel 应该抛出错误", function() {
            var options = { startValue: 0, endValue: 100 };
            expect(function() {
                $("#range_picker").rangepicker(options);
            }).to.throw(Error);
        });
    });

    describe("功能测试", function() {
        var startValue = 0,
            endValue = 100,
            translateSelectLabel = function(currentPosition, totalPosition) {
                return parseInt(100 * (currentPosition / totalPosition));
            },
            totalWidth = 400,
            rangePicker = null;

        describe("单个游标测试", function() {
            before(function() {
                rangePicker = $("#range_picker").rangepicker({
                    startValue: startValue,
                    endValue: endValue,
                    translateSelectLabel: translateSelectLabel
                });
            });

            afterEach(function() {
                $(".select-label").simulate("drag-n-drop", {dx:  totalWidth});
            });

            it("应该只有一个游标", function() {
                expect($(".select-label").length).to.equal(1);
            });

            it("初始时游标应该位于最左端", function() {
                var position = rangePicker.getSelectValue();

                expect(position.start).to.equal(startValue);
                expect(position.startLabel).to.equal("");
                expect(position.endLabel).to.
                    equal("" + translateSelectLabel(totalWidth, totalWidth));
                expect(position.end).to.equal(totalWidth);
            });

            it("向左拖动 100px 时", function() {
                $(".select-label").simulate("drag-n-drop", {dx: -100});
                var position = rangePicker.getSelectValue(),
                    endLabel = translateSelectLabel(totalWidth - 100, totalWidth);

                expect(position.start).to.equal(0);
                expect(position.startLabel).to.equal("");
                expect(position.end).to.equal(totalWidth - 100);
                expect(position.endLabel).to.equal("" + endLabel);
            });

            it("当游标到左边界时", function() {
                $(".select-label").simulate("drag-n-drop", {dx: -totalWidth});
                var position = rangePicker.getSelectValue(),
                    endLabel = translateSelectLabel(0, totalWidth);

                expect(position.start).to.equal(0);
                expect(position.startLabel).to.equal("");
                expect(position.end).to.equal(0);
                expect(position.endLabel).to.equal("" + endLabel);
            });

            it("当游标超出左边界时", function() {
                $(".select-label").simulate("drag-n-drop", {dx: -(3 * totalWidth)});
                var position = rangePicker.getSelectValue(),
                    endLabel = translateSelectLabel(0, totalWidth);

                expect(position.start).to.equal(0);
                expect(position.startLabel).to.equal("");
                expect(position.end).to.equal(0);
                expect(position.endLabel).to.equal("" + endLabel);
            });

            it("当游标超出右边界时", function() {
                $(".select-label").simulate("drag-n-drop", {dx: (3 * totalWidth)});
                var position = rangePicker.getSelectValue(),
                    endLabel = translateSelectLabel(totalWidth, totalWidth);

                expect(position.start).to.equal(0);
                expect(position.startLabel).to.equal("");
                expect(position.end).to.equal(totalWidth);
                expect(position.endLabel).to.equal("" + endLabel);
            });

        });

        describe("两个游标测试", function() {
            before(function() {
                rangePicker = $("#range_picker").rangepicker({
                    type: "double",
                    startValue: startValue,
                    endValue: endValue,
                    translateSelectLabel: translateSelectLabel
                });
            });

            afterEach(function() {
                $(".select-label:eq(0)").simulate("drag-n-drop", {dx: totalWidth});
                $(".select-label:eq(1)").simulate("drag-n-drop", {dx: -totalWidth});
            });

            it("应该有两个游标", function() {
                expect($(".select-label").length).to.equal(2);
            });

            it("初始时游标应该位于两端", function() {
                var position = rangePicker.getSelectValue();

                expect(position.start).to.equal(startValue);
                expect(position.startLabel).to.
                    equal("" + translateSelectLabel(startValue, totalWidth));
                expect(position.end).to.equal(totalWidth);
                expect(position.endLabel).to.
                    equal("" + translateSelectLabel(totalWidth, totalWidth));
            });

            it("当左边的游标向右拖动 100px 时", function() {
                var leftCursor = $(".select-label:eq(1)"),
                    position = null;
                leftCursor.simulate("drag-n-drop", {dx: 100});
                position = rangePicker.getSelectValue();

                expect(position.start).to.equal(100);
                expect(position.startLabel).to.equal("" + translateSelectLabel(100, totalWidth));
                expect(position.end).to.equal(totalWidth);
                expect(position.endLabel).to.
                    equal("" + translateSelectLabel(totalWidth, totalWidth));
            });

            it("当左边的游标超出左边界时", function() {
                var leftCursor = $(".select-label:eq(1)"),
                    position = null;
                leftCursor.simulate("drag-n-drop", {dx: -(4 * totalWidth)});
                position = rangePicker.getSelectValue();

                expect(position.start).to.equal(startValue);
                expect(position.startLabel).to.
                    equal("" + translateSelectLabel(startValue, totalWidth));
                expect(position.end).to.equal(totalWidth);
                expect(position.endLabel).to.
                    equal("" + translateSelectLabel(totalWidth, totalWidth));
            });

            it("当左边的游标超出右边界时", function() {
                var leftCursor = $(".select-label:eq(1)"),
                    position = null;
                leftCursor.simulate("drag-n-drop", {dx: (4 * totalWidth)});
                position = rangePicker.getSelectValue();

                expect(position.start).to.equal(totalWidth);
                expect(position.startLabel).to.
                    equal("" + translateSelectLabel(totalWidth, totalWidth));
                expect(position.end).to.equal(totalWidth);
                expect(position.endLabel).to.
                    equal("" + translateSelectLabel(totalWidth, totalWidth));
            });

            it("当右边的游标向左拖动 100px 时", function() {
                var rightCursor = $(".select-label:eq(0)"),
                    position = null;
                rightCursor.simulate("drag-n-drop", {dx: -100});
                position = rangePicker.getSelectValue();

                expect(position.start).to.equal(startValue);
                expect(position.startLabel).to.
                    equal("" + translateSelectLabel(startValue, totalWidth));
                expect(position.end).to.equal(totalWidth - 100);
                expect(position.endLabel).to.
                    equal("" + translateSelectLabel(totalWidth - 100, totalWidth));
            });

            it("当右边的游标超出右边界时", function() {
                var rightCursor = $(".select-label:eq(0)"),
                    position = null;
                rightCursor.simulate("drag-n-drop", {dx: (4 * totalWidth)});
                position = rangePicker.getSelectValue();

                expect(position.start).to.equal(0);
                expect(position.startLabel).to.
                    equal("" + translateSelectLabel(startValue, totalWidth));
                expect(position.end).to.equal(totalWidth);
                expect(position.endLabel).to.
                    equal("" + translateSelectLabel(totalWidth, totalWidth));
            });

            it("当右边的游标超出左边界时", function() {
                var rightCursor = $(".select-label:eq(0)"),
                    position = null;
                rightCursor.simulate("drag-n-drop", {dx: -(4 * totalWidth)});
                position = rangePicker.getSelectValue();

                expect(position.start).to.equal(startValue);
                expect(position.startLabel).to.equal("" +
                    translateSelectLabel(startValue, totalWidth));
                expect(position.end).to.equal(startValue);
                expect(position.endLabel).to.equal("" +
                    translateSelectLabel(startValue, totalWidth));
            });

            it("当左右游标互换时", function() {
                var rightCursor = $(".select-label:eq(0)"),
                    leftCursor = $(".select-label:eq(1)"),
                    position = null;
                leftCursor.simulate("drag-n-drop", {dx: (4 * totalWidth)});
                rightCursor.simulate("drag-n-drop", {dx: -(4 * totalWidth)});
                position = rangePicker.getSelectValue();

                expect(position.start).to.equal(startValue);
                expect(position.startLabel).to.
                    equal("" + translateSelectLabel(startValue, totalWidth));

                expect(position.end).to.equal(totalWidth);
                expect(position.endLabel).to.equal("" +
                    translateSelectLabel(totalWidth, totalWidth));
            });

        });
    });

    describe("回调用函数测试", function() {
        var startValue = 0,
            endValue = 100,
            translateSelectLabel = function(currentPosition, totalPosition) {
                return parseInt(100 * (currentPosition / totalPosition));
            },
            translateSpy = sinon.spy(translateSelectLabel);

        before(function() {
            $("#range_picker").rangepicker({
                startValue: startValue,
                endValue: endValue,
                translateSelectLabel: translateSpy
            });
        });

        it("translateSelectLabel 回调测试", function() {
            $(".select-label").simulate("drag-n-drop", {dx: 100});
            expect(translateSpy.called).to.equal(true);
        });
    });

    describe("方法测试", function() {
        var startValue = 0,
            endValue = 100,
            totalWidth = 400,
            translateSelectLabel = function(currentPosition, totalPosition) {
                return parseInt(100 * (currentPosition / totalPosition));
            },
            rangePicker = null;

        before(function() {
            rangePicker = $("#range_picker").rangepicker({
                type: "double",
                startValue: startValue,
                endValue: endValue,
                translateSelectLabel: translateSelectLabel
            });
        });

        afterEach(function() {
            $(".select-label:eq(0)").simulate("drag-n-drop", {dx: totalWidth});
            $(".select-label:eq(1)").simulate("drag-n-drop", {dx: -totalWidth});
        });

        it("updatePosition 可以使用象素更新游标的位置", function() {
            rangePicker.updatePosition("-100px", "100px");
            var position = rangePicker.getSelectValue();

            expect(position.start).to.equal(100);
            expect(position.startLabel).to.equal("" + translateSelectLabel(100, totalWidth));
            expect(position.end).to.equal(totalWidth - 100);
            expect(position.endLabel).to.
                equal("" + translateSelectLabel(totalWidth - 100, totalWidth));
        });

        it("updatePosition 可以使用百分比更新位置", function() {
            rangePicker.updatePosition("10%", "90%");
            var position = rangePicker.getSelectValue();

            expect(position.start).to.equal(totalWidth * 0.1);
            expect(position.startLabel).to.
                equal("" + translateSelectLabel(totalWidth * 0.1, totalWidth));
            expect(position.end).to.equal(totalWidth * 0.9);
            expect(position.endLabel).to.
                equal("" + translateSelectLabel(0.9 * totalWidth, totalWidth));
        });
    });

});
