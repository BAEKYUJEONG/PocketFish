# Redis

## Sorted Set

Score는 double 타입으로 값이 정확하지 않을 수 있으므로 JavaScript에서 값을 문자열로 변환하여 전달해주는 것이 좋다.

### Basic Usage

#### ZADD &lt;Key&gt; &lt;Score&gt; &lt;Value&gt;


 - 해당 Key에 특정 Score를 가진 Value를 추가한다.
 - Key: 어종, Score: 길이, Value: Collection id

#### ZRANGE &lt;Key&gt; &lt;StartIndex&gt; &lt;EndIndex&gt;


 - 해당 index 범위의 값을 오름차순으로 반환
 - 같은 Score일 경우, 사전식 순서
 - ZRANGE keyname 0 -1을 할 경우, 모든 값을 반환

#### ZREVRANGE &lt;Key&gt; &lt;StartIndex&gt; &lt;EndIndex&gt;


 - 해당 Index 범위의 값을 내림차순으로 반환

