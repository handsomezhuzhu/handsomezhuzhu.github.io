---
title: 数据结构与算法实验(C++)
date: 2025-01-15
descriptionHTML: '<span style="color:var(--description-font-color);">整理了数据结构考试中常用的C++模板与算法讲解</span>'
tags:
  - 笔记
  - C++
  - 算法
sidebar: true
readingTime: true
hidden: false
recommend: false
publish: false
---

# 数据结构与算法实验(C++)

这份笔记整理了数据结构考试中常用的C++模板与算法讲解

## 1. 基础环境 (Template)

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <stack>
#include <queue>
#include <functional> // for greater
using namespace std;

typedef long long ll;
const int INF = 0x3f3f3f3f;

int main() {
    // 核心：关闭同步，加速cin/cout
    ios::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    // 在这里写你的代码
    return 0;
}
```

---

## 2. 基础数据结构与 STL

### 2.1 指针与引用 (Pointers & References)
**这是很多同学容易混淆的地方，尤其是在函数传参时。**

#### 1. 如何定义
```cpp
int a = 10;
int* p = &a; // p 是指针，存储 a 的地址
int& r = a;  // r 是引用，r 就是 a 的别名 (即 r 和 a 是同一个东西)
```

#### 2. 函数传参：值传递 vs 引用传递 vs 指针传递
**场景**：你需要在一个函数里修改外面的变量，或者传递大数组不希望发生拷贝。

**A. 引用传递 (`Type& name`) —— 最推荐**
如果函数参数里写了 `&`，你在函数里**直接把它当成普通变量用**就行。
```cpp
// 这里的 x 就是外面传进来的那个变量的“分身”
void modify(int& x) {
    x = 100; // 不需要加 *，直接修改
}

int main() {
    int num = 0;
    modify(num); // num 变成 100
}
```

**B. 指针传递 (`Type* name`)**
需要传地址，函数里要用 `*` 解引用。
```cpp
void modifyPtr(int* p) {
    if (p == NULL) return;
    *p = 100; // *p 代表指针指向的那个变量
}

int main() {
    int num = 0;
    modifyPtr(&num); // 注意：要取地址符 &
}
```

**总结**：
*   看到 `void func(int &x)` -> 内部直接用 `x`，改变会影响外面。
*   看到 `void func(int *x)` -> 内部用 `*x` 访问值，调用时传地址 `&a`。
*   链表/树结构通常用指针 (`ListNode*`)，因为可能为空 (`NULL`)。

### 2.2 常用 STL 容器
**Stack (栈)**: 先进后出 (LIFO)，用于括号匹配、DFS。
```cpp
stack<int> s;
s.push(1); s.pop(); s.top(); s.empty();
```

**Queue (队列)**: 先进先出 (FIFO)，用于BFS、层序遍历。
```cpp
queue<int> q;
q.push(1); q.pop(); q.front(); q.empty();
```

**Vector (动态数组)**:
```cpp
vector<int> v;
v.push_back(1); 
sort(v.begin(), v.end()); 
v.erase(unique(v.begin(), v.end()), v.end()); // 排序后去重
```

**Priority Queue (优先队列)**: 默认大根堆。
```cpp
priority_queue<int> pq; // 大根堆
priority_queue<int, vector<int>, greater<int>> min_pq; // 小根堆
```

### 2.2 单链表 (Linked List)
**技巧**: 使用虚拟头结点 (dummy head) 处理删除操作。

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

// 1. 尾插法创建
ListNode* createList(const vector<int>& nums) {
    ListNode* dummy = new ListNode(0);
    ListNode* tail = dummy;
    for (int x : nums) {
        tail->next = new ListNode(x);
        tail = tail->next;
    }
    return dummy->next;
}

// 2. 反转链表
ListNode* reverseList(ListNode* head) {
    ListNode *prev = NULL, *curr = head;
    while (curr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}

// 3. 删除指定值的节点
ListNode* removeElements(ListNode* head, int val) {
    ListNode* dummy = new ListNode(0);
    dummy->next = head;
    ListNode* cur = dummy;
    while (cur->next) {
        if (cur->next->val == val) {
            ListNode* temp = cur->next;
            cur->next = cur->next->next;
            delete temp;
        } else {
            cur = cur->next;
        }
    }
    return dummy->next;
}
```

---

## 3. 基础算法

### 3.1 二分查找 (Binary Search)
**适用**: 有序数组中查找。
```cpp
// 查找第一个 >= target 的位置
int lower_bound_custom(const vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1, ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] >= target) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}
```

### 3.2 快速幂 (Quick Power)
**功能**: 计算 $a^b \pmod m$。
```cpp
ll qpow(ll a, ll b, ll m) {
    ll res = 1;
    a %= m;
    while (b) {
        if (b & 1) res = (res * a) % m;
        a = (a * a) % m;
        b >>= 1;
    }
    return res;
}
```

---

## 4. 字符串算法

### KMP 算法
**功能**: 字符串匹配，求 pattern 在 text 中的位置。
```cpp
// 求 next 数组
vector<int> getNext(string p) {
    int m = p.size(), j = 0;
    vector<int> nxt(m);
    nxt[0] = 0;
    for (int i = 1; i < m; i++) {
        while (j > 0 && p[i] != p[j]) j = nxt[j - 1];
        if (p[i] == p[j]) j++;
        nxt[i] = j;
    }
    return nxt;
}

// KMP 匹配
int kmp(string text, string pattern) {
    if (pattern.empty()) return 0;
    vector<int> nxt = getNext(pattern);
    int j = 0;
    for (int i = 0; i < text.size(); i++) {
        while (j > 0 && text[i] != pattern[j]) j = nxt[j - 1];
        if (text[i] == pattern[j]) j++;
        if (j == pattern.size()) return i - pattern.size() + 1;
    }
    return -1;
}
```

---

## 5. 树 (Tree)

### 5.1 二叉树遍历
```cpp
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// 递归遍历 (Pre/In/Post)
void dfs(TreeNode* root) {
    if (!root) return;
    // cout << root->val; // 先序
    dfs(root->left);
    // cout << root->val; // 中序
    dfs(root->right);
    // cout << root->val; // 后序
}

// 层序遍历 (BFS)
void levelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}
```

### 5.2 并查集 (Union-Find)
**功能**: 集合合并与查询。
```cpp
int fa[10005];
void init(int n) { for(int i=1; i<=n; i++) fa[i]=i; }
int find(int x) { return x == fa[x] ? x : fa[x] = find(fa[x]); } // 路径压缩
void unite(int x, int y) { fa[find(x)] = find(y); }
```

### 5.3 树状数组 (Fenwick Tree)
**功能**: 单点修改，区间查询前缀和。
```cpp
int bit[10005], n;
int lowbit(int x) { return x & -x; }
void add(int x, int k) { for(; x<=n; x+=lowbit(x)) bit[x]+=k; }
int query(int x) { int s=0; for(; x>0; x-=lowbit(x)) s+=bit[x]; return s; }
```

---

## 6. 图论 (Graph)

### 6.1 存图与遍历 (Adjacency List, DFS, BFS)
```cpp
struct edge { int to, w; };
vector<vector<edge>> adj; // adj[u] 存 u 的出边
vector<bool> vis;

// DFS
void dfs(int u) {
    vis[u] = true;
    for (auto e : adj[u]) {
        if (!vis[e.to]) dfs(e.to);
    }
}

// BFS (求无权图最短路)
void bfs(int s) {
    queue<int> q; q.push(s); vis[s] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto e : adj[u]) {
            if (!vis[e.to]) {
                vis[e.to] = true;
                q.push(e.to);
            }
        }
    }
}
```

### 6.2 最短路 Dijkstra (堆优化)
**注意**: 仅适用于非负权边。
```cpp
vector<int> dis;
void dijkstra(int s, int n) {
    dis.assign(n + 1, INF);
    dis[s] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    pq.push({0, s});
    
    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (d > dis[u]) continue;
        
        for (auto e : adj[u]) {
            if (dis[u] + e.w < dis[e.to]) {
                dis[e.to] = dis[u] + e.w;
                pq.push({dis[e.to], e.to});
            }
        }
    }
}
```

### 6.3 最小生成树 (Kruskal)
**原理**: 贪心，按边权从小到大选边，并查集判环。
```cpp
struct Edge { 
    int u, v, w; 
    bool operator<(const Edge& o) const { return w < o.w; }
} edges[20005];

int kruskal(int n, int m) {
    sort(edges, edges + m);
    init(n); // 并查集初始化
    int res = 0, cnt = 0;
    for (int i = 0; i < m; i++) {
        if (find(edges[i].u) != find(edges[i].v)) {
            unite(edges[i].u, edges[i].v);
            res += edges[i].w;
            cnt++;
        }
    }
    return cnt == n - 1 ? res : -1;
}
```

### 6.4 拓扑排序 (Topological Sort)
**功能**: 有向无环图 (DAG) 的排序。
```cpp
int in_degree[10005]; // 需预处理入度
vector<int> toposort(int n) {
    queue<int> q;
    for(int i=1; i<=n; i++) if(in_degree[i]==0) q.push(i);
    vector<int> res;
    while(!q.empty()){
        int u = q.front(); q.pop();
        res.push_back(u);
        for(auto e : adj[u]){
            if(--in_degree[e.to] == 0) q.push(e.to);
        }
    }
    return res;
}
```
